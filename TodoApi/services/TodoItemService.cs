using TodoApi.Models;
using TodoApi.Repositories;

namespace TodoApi.Services
{
  public interface ITodoService
  {
    IEnumerable<TodoItem> GetAll();
    TodoItem? GetById(int id);
    TodoItem Add(TodoItem item);
    bool Update(int id, TodoItem item);
    bool Delete(int id);
  }

  public class TodoService : ITodoService
  {
    private readonly ITodoRepository _repo;
    public TodoService(ITodoRepository repo) => _repo = repo;

    public IEnumerable<TodoItem> GetAll() => _repo.GetAll();
    public TodoItem? GetById(int id) => _repo.GetById(id);
    public TodoItem Add(TodoItem item) => _repo.Add(item);
    public bool Update(int id, TodoItem item) => _repo.Update(id, item);
    public bool Delete(int id) => _repo.Delete(id);
  }
}
