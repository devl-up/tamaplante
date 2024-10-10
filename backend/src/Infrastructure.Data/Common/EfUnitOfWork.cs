using Common.Application.Commands;
using Infrastructure.Data.Contexts;

namespace Infrastructure.Data.Common;

internal sealed class EfUnitOfWork(AppDbContext context) : IUnitOfWork
{
    public Task CommitAsync()
    {
        return context.SaveChangesAsync();
    }
}