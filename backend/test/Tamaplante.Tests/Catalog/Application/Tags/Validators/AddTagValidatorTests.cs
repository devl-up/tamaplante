using Catalog.Application.Tags.Commands;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace Tamaplante.Tests.Catalog.Application.Tags.Validators;

public sealed class AddTagValidatorTests
{
    private readonly AddTag.Validator _sut = new();

    [Theory]
    [InlineData("2BE2D805-294B-4EA5-96E0-087431636A0B", "name", true)]
    [InlineData("2BE2D805-294B-4EA5-96E0-087431636A0B", "", false)]
    public async Task Should_Fail_When_Invalid_Command(string id, string name, bool valid)
    {
        var command = new AddTag.Command(Guid.Parse(id), name);
        var result = await _sut.TestValidateAsync(command);
        result.IsValid.Should().Be(valid);
    }
}