using System.Net.Http.Json;
using Catalog.Application.Tags.Queries;
using Catalog.Domain.Tags.Entities;
using FluentAssertions;
using Tamaplante.IntegrationTests.Common;

namespace Tamaplante.IntegrationTests.Catalog.Tags.Queries;

[Collection("IntegrationTests")]
public sealed class GetTagsTests(IntegrationFixture integrationFixture)
{
    [Fact]
    public async Task GetTags_Should_BeSuccessful()
    {
        // Arrange
        await integrationFixture.ResetDatabaseAsync();
        using var client = integrationFixture.Factory.CreateClient();

        var tags = new List<Tag>
        {
            new() { Id = Guid.NewGuid(), Name = "Name 1" },
            new() { Id = Guid.NewGuid(), Name = "Name 2" },
            new() { Id = Guid.NewGuid(), Name = "Name 3" }
        };

        await using var context = integrationFixture.CreateDbContext();
        await context.Set<Tag>().AddRangeAsync(tags);
        await context.SaveChangesAsync();

        // Act
        var response = await client.GetFromJsonAsync<GetTags.Result>("/api/v1/tags?pageIndex=0&pageSize=2");

        // Assert
        response.Should().NotBeNull();
        response?.Total.Should().Be(3);
        response?.Tags.Should().HaveCount(2);
    }
}