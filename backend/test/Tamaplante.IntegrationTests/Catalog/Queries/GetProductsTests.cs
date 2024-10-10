using System.Net.Http.Json;
using Catalog.Application.Products.Queries;
using Catalog.Domain.Products.Entities;
using FluentAssertions;
using Tamaplante.IntegrationTests.Common;

namespace Tamaplante.IntegrationTests.Catalog.Queries;

[Collection("IntegrationTests")]
public sealed class GetProductsTests(IntegrationFixture integrationFixture)
{
    [Fact]
    public async Task GetProducts_Should_BeSuccessful()
    {
        // Arrange
        await integrationFixture.ResetDatabaseAsync();
        using var client = integrationFixture.Factory.CreateClient();

        var products = new List<Product>
        {
            new() { Id = Guid.NewGuid(), Name = "Name 1", Description = "Description 1", Price = 10 },
            new() { Id = Guid.NewGuid(), Name = "Name 2", Description = "Description 2", Price = 10 },
            new() { Id = Guid.NewGuid(), Name = "Name 3", Description = "Description 3", Price = 10 }
        };

        await using var context = integrationFixture.CreateDbContext();
        await context.Set<Product>().AddRangeAsync(products);
        await context.SaveChangesAsync();

        // Act
        var response = await client.GetFromJsonAsync<GetProducts.Result>("/api/v1/products?pageIndex=0&pageSize=2");

        // Assert
        response.Should().NotBeNull();
        response?.Total.Should().Be(3);
        response?.Products.Should().HaveCount(2);
    }
}