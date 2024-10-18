using Catalog.Application.Tags.Commands;
using Catalog.Domain.Tags.Entities;
using Catalog.Domain.Tags.Repositories;
using Common.Application.Commands;
using FluentAssertions;
using Moq;

namespace Tamaplante.Tests.Catalog.Application.Tags.Commands;

public sealed class DeleteTagsTests
{
    private readonly DeleteTags.Handler _sut;
    private readonly Mock<ITagRepository> _tagRepositoryMock;

    public DeleteTagsTests()
    {
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        _tagRepositoryMock = new();
        _sut = new(unitOfWorkMock.Object, _tagRepositoryMock.Object);
    }

    [Fact]
    public async Task Handle_Should_Fail_When_ProductsCountDoNotMatch()
    {
        // Arrange
        var command = new DeleteTags.Command([Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid(), Guid.NewGuid()]);

        var tags = new List<Tag>
        {
            new() { Id = command.TagIds[0], Name = "Name 1" },
            new() { Id = command.TagIds[1], Name = "Name 2" },
            new() { Id = command.TagIds[2], Name = "Name 3" }
        };

        _tagRepositoryMock.Setup(r => r.GetTagsAsync(command.TagIds)).ReturnsAsync(() => tags);

        // Act
        var result = await _sut.HandleAsync(command);

        // Arrange
        result.Error.Should().NotBeNull();
        result.Error?.Description.Should().Be("delete-tags-count");
    }
}