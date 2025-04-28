using TodoApi.Models;

namespace TodoApi.Repositories
{

  public interface ITodoRepository
  {
    IEnumerable<TodoItem> GetAll();
    TodoItem? GetById(int id);
    TodoItem Add(TodoItem item);
    bool Update(int id, TodoItem item);
    bool Delete(int id);
  }

  public class InMemoryTodoRepository : ITodoRepository
  {
    private readonly Dictionary<int, TodoItem> _items = new();
    private int _nextId = 1;

    public IEnumerable<TodoItem> GetAll() => _items.Values;

    public TodoItem? GetById(int id) =>
        _items.TryGetValue(id, out var item) ? item : null;

    public TodoItem Add(TodoItem item)
    {
      item.Id = _nextId++;
      item.CreatedAt = DateTime.UtcNow;
      _items[item.Id] = item;
      return item;
    }

    public bool Update(int id, TodoItem item)
    {
      if (!_items.ContainsKey(id)) return false;
      item.Id = id;
      item.CreatedAt = _items[id].CreatedAt;
      _items[id] = item;
      return true;
    }

    public bool Delete(int id) => _items.Remove(id);
  }
}