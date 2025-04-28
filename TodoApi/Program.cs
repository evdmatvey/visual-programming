using TodoApi.Models;
using TodoApi.Services;
using TodoApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ITodoRepository, InMemoryTodoRepository>();
builder.Services.AddSingleton<ITodoService, TodoService>();

var app = builder.Build();


app.MapGet("/api/todo", (ITodoService service) =>
    Results.Ok(service.GetAll()));

app.MapGet("/api/todo/{id}", (int id, ITodoService service) =>
{
    var todo = service.GetById(id);
    return todo is null ? Results.NotFound() : Results.Ok(todo);
});

app.MapPost("/api/todo", (TodoItem item, ITodoService service) =>
{
    var created = service.Add(item);
    return Results.Created($"/api/todo/{created.Id}", created);
});

app.MapPut("/api/todo/{id}", (int id, TodoItem item, ITodoService service) =>
    service.Update(id, item) ? Results.NoContent() : Results.NotFound());

app.MapDelete("/api/todo/{id}", (int id, ITodoService service) =>
    service.Delete(id) ? Results.NoContent() : Results.NotFound());

app.Run();