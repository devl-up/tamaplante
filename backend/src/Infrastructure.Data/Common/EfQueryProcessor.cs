using Common.Application.Queries;
using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Common;

internal sealed class EfQueryProcessor(AppDbContext context) : IQueryProcessor
{
    public IQueryable<T> Query<T>() where T : class
    {
        return context.Set<T>().AsNoTracking();
    }
}