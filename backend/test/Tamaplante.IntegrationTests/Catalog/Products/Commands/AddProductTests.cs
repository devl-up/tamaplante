using System.Net;
using System.Net.Http.Json;
using Catalog.Application.Products.Commands;
using Catalog.Domain.Products.Entities;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Tamaplante.IntegrationTests.Common;

namespace Tamaplante.IntegrationTests.Catalog.Products.Commands;

[Collection("IntegrationTests")]
public sealed class AddProductTest(IntegrationFixture integrationFixture)
{
    [Fact]
    public async Task AddProduct_Should_BeSuccessful()
    {
        // Arrange
        await integrationFixture.ResetDatabaseAsync();
        using var client = integrationFixture.Factory.CreateClient();

        var command = new AddProduct.Command(Guid.NewGuid(), "Name", "Description", 10);

        // Act
        var response = await client.PostAsJsonAsync("api/v1/products", command);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        await using var dbContext = integrationFixture.CreateDbContext();
        var product = await dbContext.Set<Product>().FirstOrDefaultAsync(x => x.Id == command.Id);
        product.Should().NotBeNull();
    }
}