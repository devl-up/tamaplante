using Catalog.Application.Products.Commands;
using Catalog.Domain.Products.Repositories;
using Catalog.Domain.Tags.Entities;
using Catalog.Domain.Tags.Repositories;
using Common.Application.Commands;
using FluentAssertions;
using FluentValidation;
using Moq;

namespace Tamaplante.Tests.Catalog.Application.Products.Commands;

public class AddProductTests
{
    private readonly AddProduct.Handler _sut;
    private readonly Mock<ITagRepository> _tagRepositoryMock;
    private readonly Mock<IValidator<AddProduct.Command>> _validatorMock;

    public AddProductTests()
    {
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        var productRepositoryMock = new Mock<IProductRepository>();
        _tagRepositoryMock = new();
        _validatorMock = new();

        _sut = new(unitOfWorkMock.Object, productRepositoryMock.Object, _tagRepositoryMock.Object, _validatorMock.Object);
    }

    [Fact]
    public async Task Handle_Should_Fail_When_TagsCountDoNotMatch()
    {
        // Arrange
        var command = new AddProduct.Command(Guid.NewGuid(), "Name", "Description", 10, [Guid.NewGuid(), Guid.NewGuid()]);
        var tags = command.TagIds.Take(1).Select(id => new Tag { Id = id, Name = "Name" }).ToList();

        _validatorMock.Setup(validator => validator.ValidateAsync(command, It.IsAny<CancellationToken>())).ReturnsAsync(() => new());
        _tagRepositoryMock.Setup(repository => repository.GetTagsAsync(command.TagIds)).ReturnsAsync(() => tags);

        // Act
        var result = await _sut.HandleAsync(command);

        // Assert
        result.Error.Should().NotBeNull();
        result.Error?.Description.Should().Be("add-product-tags-count");
    }
}