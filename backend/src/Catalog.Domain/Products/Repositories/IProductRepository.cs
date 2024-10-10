using Catalog.Domain.Products.Entities;

namespace Catalog.Domain.Products.Repositories;

public interface IProductRepository
{
    Task AddAsync(Product product);
}