using Commnets.Data;
using Commnets.Models;
using Commnets.Repositories;
using Commnets.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddSingleton<ILoggerProvider, DatabaseLoggerProvider>();

builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService>();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapGet("/comments", (CommentService service, ILogger<Program> logger) =>
{
    logger.LogInformation("Получен запрос на получение всех комментариев");
    var comments = service.GetAll();
    logger.LogInformation($"Возвращено {comments.Count()} комментариев");
    return Results.Ok(comments);
});


app.MapGet("/comments/{id}", (int id, CommentService service, ILogger<Program> logger) =>
{
    logger.LogInformation("Получен запрос на получение комментария с id={Id}", id);
    var comment = service.GetById(id);
    if (comment is null)
    {
        logger.LogWarning("Комментарий с id={Id} не найден", id);
        return Results.NotFound();
    }
    logger.LogInformation("Комментарий с id={Id} найден", id);
    return Results.Ok(comment);
});

app.MapPost("/comments", (Comment comment, CommentService service, ILogger<Program> logger) =>
{
    logger.LogInformation("Добавление нового комментария: {Comment}", comment);
    var createdComment = service.Add(comment);
    logger.LogInformation("Комментарий добавлен с id={Id}", createdComment.Id);
    return Results.Created($"/comments/{createdComment.Id}", createdComment);
});

app.MapPatch("/comments/{id}", (int id, Comment updatedComment, CommentService service, ILogger<Program> logger) =>
{
    logger.LogInformation("Обновление комментария с id={Id}", id);
    var existingComment = service.GetById(id);
    if (existingComment is null)
    {
        logger.LogWarning("Комментарий с id={Id} не найден для обновления", id);
        return Results.NotFound();
    }

    var commentToUpdate = new Comment
    {
        Id = id,
        PostId = updatedComment.PostId != 0 ? updatedComment.PostId : existingComment.PostId,
        Name = updatedComment.Name ?? existingComment.Name,
        Email = updatedComment.Email ?? existingComment.Email,
        Body = updatedComment.Body ?? existingComment.Body
    };

    var updated = service.Update(commentToUpdate);
    if (updated)
    {
        logger.LogInformation("Комментарий с id={Id} успешно обновлен", id);
        return Results.Ok(service.GetById(id));
    }
    else
    {
        logger.LogWarning("Не удалось обновить комментарий с id={Id}", id);
        return Results.NotFound();
    }
});

app.MapDelete("/comments/{id}", (int id, CommentService service, ILogger<Program> logger) =>
{
    logger.LogInformation("Удаление комментария с id={Id}", id);
    var deleted = service.Delete(id);
    if (deleted)
    {
        logger.LogInformation("Комментарий с id={Id} удален", id);
        return Results.NoContent();
    }
    else
    {
        logger.LogWarning("Комментарий с id={Id} не найден для удаления", id);
        return Results.NotFound();
    }
});


app.MapGet("/logs", (string? level, string? category, string? search, ApplicationDbContext context) =>
{
    var query = context.Logs.AsQueryable();

    if (!string.IsNullOrEmpty(level))
        query = query.Where(l => l.LogLevel == level);

    if (!string.IsNullOrEmpty(category))
        query = query.Where(l => l.Category.Contains(category));

    if (!string.IsNullOrEmpty(search))
        query = query.Where(l => l.Message.Contains(search) || (l.Exception != null && l.Exception.Contains(search)));

    var logs = query.OrderByDescending(l => l.Timestamp).Take(100).ToList();

    return Results.Ok(logs);
});

app.Run();
