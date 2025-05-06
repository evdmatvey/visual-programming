using Microsoft.EntityFrameworkCore;
using Commnets.Models;

namespace Commnets.Data
{
  public class ApplicationDbContext : DbContext
  {
    public DbSet<Comment> Comments { get; set; } = null!;
    public DbSet<Log> Logs { get; set; } = null!;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
  }
}
