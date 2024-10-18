using System.Net.Http.Json;
using Catalog.Application.Products.Queries;
using Catalog.Domain.Products.Entities;
using FluentAssertions;
using Tamaplante.IntegrationTests.Common;

namespace Tamaplante.IntegrationTests.Catalog.Products.Queries;

[Collection("IntegrationTests")]
public sealed class GetProductTests(IntegrationFixture integrationFixture)
{
    [Fact]
    public async Task GetProduct_Should_BeSuccessful()
    {
        // Arrange
        await integrationFixture.ResetDatabaseAsync();
        using var client = integrationFixture.Factory.CreateClient();

        var products = new List<Product>
        {
            new() { Id = Guid.NewGuid(), Name = "Name 1", Description = "Description 1", Price = 10, Tags = { new() { Id = Guid.NewGuid(), Name = "Name" } } },
            new() { Id = Guid.NewGuid(), Name = "Name 2", Description = "Description 2", Price = 10 }
        };

        var product = products.First();

        await using var context = integrationFixture.CreateDbContext();
        await context.Set<Product>().AddRangeAsync(products);
        await context.SaveChangesAsync();

        // Act
        var response = await client.GetFromJsonAsync<GetProduct.ProductDto>($"/api/v1/products/{product.Id}");

        // Assert
        var expectedProduct = new GetProduct.ProductDto(product.Id, product.Name, product.Description, product.Price, product.Tags.Select(t => new GetProduct.TagDto(t.Id, t.Name)));
        response.Should().NotBeNull();
        response.Should().BeEquivalentTo(expectedProduct);
    }
}