using Catalog.Domain.Products.Entities;

namespace Catalog.Domain.Products.Repositories;

public interface IProductRepository
{
    Task<List<Product>> GetProducts(List<Guid> ids);
    Task AddAsync(Product product);
    void Delete(List<Product> products);
}