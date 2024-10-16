using Catalog.Application.Products.Commands;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace Tamaplante.Tests.Catalog.Application.Products.Validators;

public sealed class EditProductValidatorTests
{
    private readonly EditProduct.Validator _sut = new();

    [Theory]
    [InlineData("2BE2D805-294B-4EA5-96E0-087431636A0B", "name", "description", 0, true)]
    [InlineData("2BE2D805-294B-4EA5-96E0-087431636A0B", "", "description", 0, false)]
    [InlineData("2BE2D805-294B-4EA5-96E0-087431636A0B", "name", "", 0, false)]
    [InlineData("2BE2D805-294B-4EA5-96E0-087431636A0B", "name", "description", -1, false)]
    [InlineData("00000000-0000-0000-0000-000000000000", "name", "description", 0, false)]
    public async Task Should_Fail_When_Invalid_Command(string id, string name, string description, decimal price, bool valid)
    {
        var command = new EditProduct.Command(Guid.Parse(id), name, description, price);
        var result = await _sut.TestValidateAsync(command);
        result.IsValid.Should().Be(valid);
    }
}