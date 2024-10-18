using Catalog.Domain.Tags.Entities;
using Catalog.Domain.Tags.Repositories;
using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

internal sealed class EfTagRepository(AppDbContext context) : ITagRepository
{
    public Task<List<Tag>> GetTagsAsync(List<Guid> ids)
    {
        return context.Set<Tag>()
            .Where(t => ids.Contains(t.Id))
            .ToListAsync();
    }

    public Task AddAsync(Tag tag)
    {
        return context.Set<Tag>().AddAsync(tag).AsTask();
    }

    public void Delete(List<Tag> tags)
    {
        context.Set<Tag>().RemoveRange(tags);
    }

    public Task<Tag> GetByIdAsync(Guid id)
    {
        return context.Set<Tag>().FirstAsync(t => t.Id == id);
    }
}