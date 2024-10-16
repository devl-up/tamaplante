using Catalog.Application.Products.Commands;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace Tamaplante.Tests.Catalog.Application.Products.Validators;

public sealed class DeleteProductsValidatorTests
{
    private readonly DeleteProducts.Validator _sut = new();

    [Fact]
    public async Task Should_Fail_When_Ids_Are_Empty()
    {
        var command = new DeleteProducts.Command([]);
        var result = await _sut.TestValidateAsync(command);
        result.IsValid.Should().Be(false);
    }

    [Fact]
    public async Task Should_Succeed_When_Ids_Are_NotEmpty()
    {
        var command = new DeleteProducts.Command([Guid.NewGuid()]);
        var result = await _sut.TestValidateAsync(command);
        result.IsValid.Should().Be(true);
    }
}