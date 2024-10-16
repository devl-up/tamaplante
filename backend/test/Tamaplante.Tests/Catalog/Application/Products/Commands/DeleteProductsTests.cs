using Catalog.Application.Products.Commands;
using Catalog.Domain.Products.Entities;
using Catalog.Domain.Products.Repositories;
using Common.Application.Commands;
using FluentAssertions;
using Moq;

namespace Tamaplante.Tests.Catalog.Application.Products.Commands;

public sealed class DeleteProductsTests
{
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly DeleteProducts.Handler _sut;

    public DeleteProductsTests()
    {
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        _productRepositoryMock = new();
        _sut = new(unitOfWorkMock.Object, _productRepositoryMock.Object);
    }

    [Fact]
    public async Task Handle_Should_Fail_When_ProductsCountDoNotMatch()
    {
        // Arrange
        var command = new DeleteProducts.Command([Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid()]);

        var products = new List<Product>
        {
            new() { Id = command.ProductIds[0], Name = "Name 1", Description = "Description 1", Price = 10 },
            new() { Id = command.ProductIds[1], Name = "Name 2", Description = "Description 2", Price = 10 },
            new() { Id = command.ProductIds[2], Name = "Name 3", Description = "Description 3", Price = 10 }
        };

        _productRepositoryMock.Setup(r => r.GetProductsAsync(command.ProductIds)).ReturnsAsync(() => products);

        // Act
        var result = await _sut.HandleAsync(command);

        // Arrange
        result.Error.Should().NotBeNull();
        result.Error?.Description.Should().Be("delete-product-count");
    }
}