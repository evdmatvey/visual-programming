using Microsoft.Extensions.Logging;
using Commnets.Data;
using Commnets.Models;

public class DatabaseLogger : ILogger
{
  private readonly string _categoryName;
  private readonly IServiceScopeFactory _scopeFactory;

  public DatabaseLogger(string categoryName, IServiceScopeFactory scopeFactory)
  {
    _categoryName = categoryName;
    _scopeFactory = scopeFactory;
  }

  IDisposable ILogger.BeginScope<TState>(TState state)
  {
    return null!;
  }

  public bool IsEnabled(LogLevel logLevel)
  {
    return logLevel >= LogLevel.Information;
  }

  public void Log<TState>(LogLevel logLevel, EventId eventId,
      TState state, Exception? exception, Func<TState, Exception?, string> formatter)
  {
    if (!IsEnabled(logLevel))
      return;

    if (_categoryName.Contains("Microsoft.EntityFrameworkCore"))
      return;

    var message = formatter(state, exception);

    using var scope = _scopeFactory.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    var logEntry = new Log
    {
      Timestamp = DateTime.UtcNow,
      LogLevel = logLevel.ToString(),
      Category = _categoryName,
      Message = message,
      Exception = exception?.ToString()
    };

    context.Logs.Add(logEntry);
    context.SaveChanges();
  }
}

public class DatabaseLoggerProvider : ILoggerProvider
{
  private readonly IServiceScopeFactory _scopeFactory;

  public DatabaseLoggerProvider(IServiceScopeFactory scopeFactory)
  {
    _scopeFactory = scopeFactory;
  }

  public ILogger CreateLogger(string categoryName)
  {
    return new DatabaseLogger(categoryName, _scopeFactory);
  }

  public void Dispose()
  {
  }
}
