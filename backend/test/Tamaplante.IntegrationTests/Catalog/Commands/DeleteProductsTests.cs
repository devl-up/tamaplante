using System.Net;
using System.Net.Http.Json;
using Catalog.Application.Products.Commands;
using Catalog.Domain.Products.Entities;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Tamaplante.IntegrationTests.Common;

namespace Tamaplante.IntegrationTests.Catalog.Commands;

[Collection("IntegrationTests")]
public sealed class DeleteProductsTests(IntegrationFixture integrationFixture)
{
    [Fact]
    public async Task DeleteProduct_Should_BeSuccessful()
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

        await using (var context = integrationFixture.CreateDbContext())
        {
            await context.Set<Product>().AddRangeAsync(products);
            await context.SaveChangesAsync();
        }

        var command = new DeleteProducts.Command(products.Take(2).Select(p => p.Id).ToList());

        // Act
        var request = new HttpRequestMessage(HttpMethod.Delete, "/api/v1/products");
        request.Content = JsonContent.Create(command);
        var response = await client.SendAsync(request);

        // Assert
        response.Should().NotBeNull();
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        await using (var context = integrationFixture.CreateDbContext())
        {
            var productsCount = await context.Set<Product>().CountAsync();
            productsCount.Should().Be(1);
        }
    }
}