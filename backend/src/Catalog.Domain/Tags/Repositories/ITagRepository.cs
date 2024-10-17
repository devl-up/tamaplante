using Catalog.Domain.Tags.Entities;

namespace Catalog.Domain.Tags.Repositories;

public interface ITagRepository
{
    Task AddAsync(Tag tag);
}