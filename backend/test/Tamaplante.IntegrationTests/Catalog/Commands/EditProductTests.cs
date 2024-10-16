using System.Net;
using System.Net.Http.Json;
using Catalog.Application.Products.Commands;
using Catalog.Domain.Products.Entities;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Tamaplante.IntegrationTests.Common;

namespace Tamaplante.IntegrationTests.Catalog.Commands;

[Collection("IntegrationTests")]
public sealed class EditProductTest(IntegrationFixture integrationFixture)
{
    [Fact]
    public async Task EditProduct_Should_BeSuccessful()
    {
        // Arrange
        await integrationFixture.ResetDatabaseAsync();
        using var client = integrationFixture.Factory.CreateClient();

        var productId = Guid.NewGuid();

        await using (var dbContext = integrationFixture.CreateDbContext())
        {
            var product = new Product
            {
                Id = productId,
                Name = "Name",
                Description = "Description",
                Price = 10
            };

            await dbContext.AddAsync(product);
            await dbContext.SaveChangesAsync();
        }

        var command = new EditProduct.Command(productId, "NewName", "NewDescription", 20);

        // Act
        var response = await client.PutAsJsonAsync("api/v1/products", command);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);


        await using (var dbContext = integrationFixture.CreateDbContext())
        {
            var product = await dbContext.Set<Product>().FirstOrDefaultAsync(x => x.Id == productId);
            product.Should().NotBeNull();
            product.Should().BeEquivalentTo(new Product { Id = productId, Name = command.Name, Description = command.Description, Price = command.Price });
        }
    }
}