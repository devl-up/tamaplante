using Catalog.Domain.Products.Entities;
using Catalog.Domain.Products.Repositories;
using Infrastructure.Data.Contexts;

namespace Infrastructure.Data.Repositories;

internal sealed class EfProductRepository(AppDbContext context) : IProductRepository
{
    public Task AddAsync(Product product)
    {
        return context.AddRangeAsync(product);
    }
}