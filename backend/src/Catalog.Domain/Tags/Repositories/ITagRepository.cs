using Catalog.Domain.Tags.Entities;

namespace Catalog.Domain.Tags.Repositories;

public interface ITagRepository
{
    Task<List<Tag>> GetTagsAsync(List<Guid> ids);
    Task AddAsync(Tag tag);
    void Delete(List<Tag> tags);
    Task<Tag> GetByIdAsync(Guid id);
}