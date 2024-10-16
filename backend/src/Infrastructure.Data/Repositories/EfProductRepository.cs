using Catalog.Domain.Products.Entities;
using Catalog.Domain.Products.Repositories;
using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

internal sealed class EfProductRepository(AppDbContext context) : IProductRepository
{
    public Task<List<Product>> GetProductsAsync(List<Guid> ids)
    {
        return context.Set<Product>().Where(p => ids.Contains(p.Id)).ToListAsync();
    }

    public Task AddAsync(Product product)
    {
        return context.Set<Product>().AddRangeAsync(product);
    }

    public void Delete(List<Product> products)
    {
        context.Set<Product>().RemoveRange(products);
    }

    public Task<Product> GetByIdAsync(Guid id)
    {
        return context.Set<Product>().FirstAsync(p => p.Id == id);
    }
}