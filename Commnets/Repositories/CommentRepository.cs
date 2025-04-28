using Commnets.Models;
using Commnets.Data;
using Microsoft.EntityFrameworkCore;

namespace Commnets.Repositories;

public class CommentRepository : ICommentRepository
{
    private readonly ApplicationDbContext _context;

    public CommentRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Comment> GetAll()
    {
        return _context.Comments.AsNoTracking().ToList();
    }

    public Comment? GetById(int id)
    {
        return _context.Comments.AsNoTracking().FirstOrDefault(c => c.Id == id);
    }

    public void Add(Comment comment)
    {
        _context.Comments.Add(comment);
        _context.SaveChanges();
    }

    public bool Update(Comment updatedComment)
    {
        var existingComment = _context.Comments.Find(updatedComment.Id);
        if (existingComment == null) return false;

        existingComment.PostId = updatedComment.PostId != 0 ? updatedComment.PostId : existingComment.PostId;
        existingComment.Name = !string.IsNullOrEmpty(updatedComment.Name) ? updatedComment.Name : existingComment.Name;
        existingComment.Email = !string.IsNullOrEmpty(updatedComment.Email) ? updatedComment.Email : existingComment.Email;
        existingComment.Body = !string.IsNullOrEmpty(updatedComment.Body) ? updatedComment.Body : existingComment.Body;

        _context.SaveChanges();
        return true;
    }

    public bool Delete(int id)
    {
        var comment = _context.Comments.Find(id);
        if (comment == null) return false;

        _context.Comments.Remove(comment);
        _context.SaveChanges();
        return true;
    }
}
