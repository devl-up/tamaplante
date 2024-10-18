using Catalog.Domain.Products.Entities;
using Common.Application.Queries;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Application.Products.Queries;

public static class GetProduct
{
    public sealed record Query(Guid Id) : IQuery<ProductDto?>;

    public sealed record TagDto(Guid Id, string Name);

    public sealed record ProductDto(Guid Id, string Name, string Description, decimal Price, IEnumerable<TagDto> Tags);

    public sealed class Handler(IQueryProcessor queryProcessor) : IQueryHandler<Query, ProductDto?>
    {
        public Task<ProductDto?> HandleAsync(Query query)
        {
            return queryProcessor.Query<Product>()
                .Include(p => p.Tags)
                .Where(p => p.Id == query.Id)
                .Select(p => new ProductDto(p.Id, p.Name, p.Description, p.Price, p.Tags.Select(t => new TagDto(t.Id, t.Name))))
                .FirstOrDefaultAsync();
        }
    }
}