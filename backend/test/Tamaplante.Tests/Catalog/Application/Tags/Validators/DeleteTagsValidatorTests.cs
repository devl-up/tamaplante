using Catalog.Application.Tags.Commands;
using FluentAssertions;
using FluentValidation.TestHelper;

namespace Tamaplante.Tests.Catalog.Application.Tags.Validators;

public sealed class DeleteTagsValidatorTests
{
    private readonly DeleteTags.Validator _sut = new();

    [Fact]
    public async Task Should_Fail_When_Ids_Are_Empty()
    {
        var command = new DeleteTags.Command([]);
        var result = await _sut.TestValidateAsync(command);
        result.IsValid.Should().Be(false);
    }

    [Fact]
    public async Task Should_Succeed_When_Ids_Are_NotEmpty()
    {
        var command = new DeleteTags.Command([Guid.NewGuid()]);
        var result = await _sut.TestValidateAsync(command);
        result.IsValid.Should().Be(true);
    }
}