using System.Net;
using System.Net.Http.Json;
using Catalog.Application.Tags.Commands;
using Catalog.Domain.Tags.Entities;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Tamaplante.IntegrationTests.Common;

namespace Tamaplante.IntegrationTests.Catalog.Tags.Commands;

[Collection("IntegrationTests")]
public sealed class DeleteTagsTests(IntegrationFixture integrationFixture)
{
    [Fact]
    public async Task DeleteTag_Should_BeSuccessful()
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

        await using (var context = integrationFixture.CreateDbContext())
        {
            await context.Set<Tag>().AddRangeAsync(tags);
            await context.SaveChangesAsync();
        }

        var command = new DeleteTags.Command(tags.Take(2).Select(p => p.Id).ToList());

        // Act
        var request = new HttpRequestMessage(HttpMethod.Delete, "/api/v1/tags");
        request.Content = JsonContent.Create(command);
        var response = await client.SendAsync(request);

        // Assert
        response.Should().NotBeNull();
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        await using (var context = integrationFixture.CreateDbContext())
        {
            var tagsCount = await context.Set<Tag>().CountAsync();
            tagsCount.Should().Be(1);
        }
    }
}