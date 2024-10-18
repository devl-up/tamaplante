using Catalog.Application.Products.Commands;
using Catalog.Domain.Products.Entities;
using Catalog.Domain.Products.Repositories;
using Catalog.Domain.Tags.Entities;
using Catalog.Domain.Tags.Repositories;
using Common.Application.Commands;
using FluentAssertions;
using FluentValidation;
using Moq;

namespace Tamaplante.Tests.Catalog.Application.Products.Commands;

public class EditProductTests
{
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly EditProduct.Handler _sut;
    private readonly Mock<ITagRepository> _tagRepositoryMock;
    private readonly Mock<IValidator<EditProduct.Command>> _validatorMock;

    public EditProductTests()
    {
        var unitOfWorkMock = new Mock<IUnitOfWork>();
        _productRepositoryMock = new();
        _tagRepositoryMock = new();
        _validatorMock = new();

        _sut = new(unitOfWorkMock.Object, _productRepositoryMock.Object, _tagRepositoryMock.Object, _validatorMock.Object);
    }

    [Fact]
    public async Task Handle_Should_Fail_When_TagsCountDoNotMatch()
    {
        // Arrange
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = "Name",
            Description = "Description",
            Price = 10
        };

        var command = new EditProduct.Command(product.Id, "Name", "Description", 10, [Guid.NewGuid(), Guid.NewGuid()]);
        var tags = command.TagIds.Take(1).Select(id => new Tag { Id = id, Name = "Name" }).ToList();

        _validatorMock.Setup(validator => validator.ValidateAsync(command, It.IsAny<CancellationToken>())).ReturnsAsync(() => new());
        _productRepositoryMock.Setup(repository => repository.GetByIdAsync(command.Id)).ReturnsAsync(() => product);
        _tagRepositoryMock.Setup(repository => repository.GetTagsAsync(command.TagIds)).ReturnsAsync(() => tags);

        // Act
        var result = await _sut.HandleAsync(command);

        // Assert
        result.Error.Should().NotBeNull();
        result.Error?.Description.Should().Be("edit-product-tags-count");
    }
}