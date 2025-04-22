namespace Commnets.Repositories;

using Commnets.Models;

public class CommentRepository : ICommentRepository
{
    private readonly Dictionary<int, Comment> _comments = new();
    private int _nextId = 1;

    public IEnumerable<Comment> GetAll() => _comments.Values;

    public Comment? GetById(int id) => _comments.GetValueOrDefault(id);

    public void Add(Comment comment)
    {
        comment.Id = _nextId++;
        _comments[comment.Id] = comment;
    }

    public bool Update(Comment updatedComment)
    {
        if (!_comments.TryGetValue(updatedComment.Id, out var existingComment))
            return false;

        var mergedComment = new Comment
        {
            Id = existingComment.Id,
            PostId = updatedComment.PostId != 0 ? updatedComment.PostId : existingComment.PostId,
            Name = !string.IsNullOrEmpty(updatedComment.Name) ? updatedComment.Name : existingComment.Name,
            Email = !string.IsNullOrEmpty(updatedComment.Email) ? updatedComment.Email : existingComment.Email,
            Body = !string.IsNullOrEmpty(updatedComment.Body) ? updatedComment.Body : existingComment.Body
        };

        _comments[updatedComment.Id] = mergedComment;
        return true;
    }


    public bool Delete(int id) => _comments.Remove(id);
}
