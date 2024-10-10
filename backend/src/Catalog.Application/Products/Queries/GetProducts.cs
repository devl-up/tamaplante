using Catalog.Domain.Products.Entities;
using Common.Application.Queries;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Application.Products.Queries;

public static class GetProducts
{
    public sealed record Query(int PageIndex, int PageSize) : IQuery<Result>;

    public sealed record Dto(Guid Id, string Name, string Description, decimal Price);

    public sealed record Result(List<Dto> Products, int Total);

    private sealed class Handler(IQueryProcessor queryProcessor) : IQueryHandler<Query, Result>
    {
        public async Task<Result> HandleAsync(Query query)
        {
            var products = await queryProcessor.Query<Product>()
                .OrderBy(x => x.Name)
                .Skip(query.PageIndex * query.PageSize)
                .Take(query.PageSize)
                .Select(x => new Dto(x.Id, x.Name, x.Description, x.Price))
                .ToListAsync();

            var total = await queryProcessor.Query<Product>()
                .CountAsync();

            return new(products, total);
        }
    }
}