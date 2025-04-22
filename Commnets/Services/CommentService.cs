using Commnets.Models;
using Commnets.Repositories;

namespace Commnets.Services;

public class CommentService
{
    private readonly ICommentRepository _repository;

    public CommentService(ICommentRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Comment> GetAll() => _repository.GetAll();

    public Comment? GetById(int id) => _repository.GetById(id);

    public Comment Add(Comment comment)
    {
        _repository.Add(comment);
        return comment;
    }

    public bool Update(Comment comment) => _repository.Update(comment);

    public bool Delete(int id) => _repository.Delete(id);

}
