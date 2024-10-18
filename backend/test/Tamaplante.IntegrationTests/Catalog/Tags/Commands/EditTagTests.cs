using System.Net;
using System.Net.Http.Json;
using Catalog.Application.Tags.Commands;
using Catalog.Domain.Tags.Entities;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Tamaplante.IntegrationTests.Common;

namespace Tamaplante.IntegrationTests.Catalog.Tags.Commands;

[Collection("IntegrationTests")]
public sealed class EditTagTest(IntegrationFixture integrationFixture)
{
    [Fact]
    public async Task EditTag_Should_BeSuccessful()
    {
        // Arrange
        await integrationFixture.ResetDatabaseAsync();
        using var client = integrationFixture.Factory.CreateClient();

        var tag = new Tag
        {
            Id = Guid.NewGuid(),
            Name = "Name"
        };

        await using (var dbContext = integrationFixture.CreateDbContext())
        {
            await dbContext.Set<Tag>().AddAsync(tag);
            await dbContext.SaveChangesAsync();
        }

        var command = new EditTag.Command(tag.Id, "NewName");

        // Act
        var response = await client.PutAsJsonAsync("api/v1/tags", command);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NoContent);


        await using (var dbContext = integrationFixture.CreateDbContext())
        {
            var expectedTag = new Tag
            {
                Id = command.Id,
                Name = command.Name
            };

            var actualTag = await dbContext.Set<Tag>().FirstOrDefaultAsync(x => x.Id == command.Id);
            actualTag.Should().NotBeNull();
            actualTag.Should().BeEquivalentTo(expectedTag);
        }
    }
}