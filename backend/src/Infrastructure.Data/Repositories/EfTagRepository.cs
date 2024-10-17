using Catalog.Domain.Tags.Entities;
using Catalog.Domain.Tags.Repositories;
using Infrastructure.Data.Contexts;

namespace Infrastructure.Data.Repositories;

internal sealed class EfTagRepository(AppDbContext context) : ITagRepository
{
    public Task AddAsync(Tag tag)
    {
        return context.Set<Tag>().AddAsync(tag).AsTask();
    }
}