namespace Commnets.Repositories;

using Commnets.Models;

public interface ICommentRepository
{
  IEnumerable<Comment> GetAll();
  Comment? GetById(int id);
  void Add(Comment comment);
  bool Update(Comment comment);
  bool Delete(int id);
}
