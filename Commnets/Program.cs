using Commnets.Data;
using Commnets.Models;
using Commnets.Repositories;
using Commnets.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService>();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapGet("/comments", (CommentService service) =>
    Results.Ok(service.GetAll()));

app.MapGet("/comments/{id}", (int id, CommentService service) =>
    service.GetById(id) is { } comment
        ? Results.Ok(comment)
        : Results.NotFound());

app.MapPost("/comments", (Comment comment, CommentService service) =>
{
    var createdComment = service.Add(comment);
    return Results.Created($"/comments/{createdComment.Id}", createdComment);
});

app.MapPatch("/comments/{id}", async (int id, Comment updatedComment, CommentService service) =>
{
    var existingComment = service.GetById(id);
    if (existingComment is null) return Results.NotFound();

    var commentToUpdate = new Comment
    {
        Id = id,
        PostId = updatedComment.PostId != 0 ? updatedComment.PostId : existingComment.PostId,
        Name = updatedComment.Name ?? existingComment.Name,
        Email = updatedComment.Email ?? existingComment.Email,
        Body = updatedComment.Body ?? existingComment.Body
    };

    return service.Update(commentToUpdate)
        ? Results.Ok(service.GetById(id))
        : Results.NotFound();
});

app.MapDelete("/comments/{id}", (int id, CommentService service) =>
    service.Delete(id) ? Results.NoContent() : Results.NotFound());

app.Run();
