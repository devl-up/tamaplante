using Catalog.Domain.Products.Entities;

namespace Catalog.Domain.Products.Repositories;

public interface IProductRepository
{
    Task<List<Product>> GetProductsAsync(List<Guid> ids);
    Task AddAsync(Product product);
    void Delete(List<Product> products);
    Task<Product> GetByIdAsync(Guid id);
}