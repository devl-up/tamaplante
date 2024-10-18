using System.Net;
using System.Net.Http.Json;
using Catalog.Application.Products.Commands;
using Catalog.Domain.Products.Entities;
using Catalog.Domain.Tags.Entities;
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

        var tags = new List<Tag>
        {
            new() { Id = Guid.NewGuid(), Name = "Tag 1" },
            new() { Id = Guid.NewGuid(), Name = "Tag 2" }
        };

        await using (var dbContext = integrationFixture.CreateDbContext())
        {
            await dbContext.Set<Tag>().AddRangeAsync(tags);
            await dbContext.SaveChangesAsync();
        }

        var command = new AddProduct.Command(Guid.NewGuid(), "Name", "Description", 10, tags.Select(t => t.Id).ToList());

        // Act
        var response = await client.PostAsJsonAsync("api/v1/products", command);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        await using (var dbContext = integrationFixture.CreateDbContext())
        {
            var expectedProduct = new Product { Id = command.Id, Name = command.Name, Description = command.Description, Price = command.Price };
            expectedProduct.Tags.AddRange(tags);

            var actualProduct = await dbContext.Set<Product>()
                .Include(p => p.Tags)
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            actualProduct.Should().NotBeNull();
            actualProduct.Should().BeEquivalentTo(expectedProduct);
        }
    }
}