using Catalog.Domain.Tags.Repositories;
using Common.Application.Commands;
using Common.Application.Models;
using FluentValidation;

namespace Catalog.Application.Tags.Commands;

public static class DeleteTags
{
    public sealed record Command(List<Guid> TagIds) : ICommand;

    public sealed class Handler(IUnitOfWork unitOfWork, ITagRepository tagRepository) : ICommandHandler<Command>
    {
        public async Task<Result> HandleAsync(Command command)
        {
            var tags = await tagRepository.GetTagsAsync(command.TagIds);
            if (tags.Count != command.TagIds.Count) return Result.Fail("delete-tags-count");

            tagRepository.Delete(tags);
            await unitOfWork.CommitAsync();

            return Result.Ok();
        }
    }

    public sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(p => p.TagIds)
                .NotEmpty();
        }
    }
}