﻿using Catalog.Domain.Tags.Repositories;
using Common.Application.Commands;
using Common.Application.Models;
using FluentValidation;

namespace Catalog.Application.Tags.Commands;

public static class EditTag
{
    public sealed record Command(Guid Id, string Name) : ICommand;

    public sealed class Handler(IUnitOfWork unitOfWork, ITagRepository tagRepository, IValidator<Command> validator) : ICommandHandler<Command>
    {
        public async Task<Result> HandleAsync(Command command)
        {
            var (id, name) = command;

            var validationResult = await validator.ValidateAsync(command);
            if (!validationResult.IsValid) return Result.Fail("edit-tag-validation");

            var tag = await tagRepository.GetByIdAsync(id);

            tag.Name = name;

            await unitOfWork.CommitAsync();

            return Result.Ok();
        }
    }

    public sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(x => x.Id)
                .NotEmpty();

            RuleFor(x => x.Name)
                .NotEmpty()
                .MaximumLength(20);
        }
    }
}