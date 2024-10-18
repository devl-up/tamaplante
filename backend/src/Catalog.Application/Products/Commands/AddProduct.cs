using Catalog.Domain.Products.Entities;
using Catalog.Domain.Products.Repositories;
using Catalog.Domain.Tags.Repositories;
using Common.Application.Commands;
using Common.Application.Models;
using FluentValidation;

namespace Catalog.Application.Products.Commands;

public static class AddProduct
{
    public sealed record Command(Guid Id, string Name, string Description, decimal Price, List<Guid> TagIds) : ICommand;

    public sealed class Handler(IUnitOfWork unitOfWork, IProductRepository productRepository, ITagRepository tagRepository, IValidator<Command> validator) : ICommandHandler<Command>
    {
        public async Task<Result> HandleAsync(Command command)
        {
            var (id, name, description, price, tagIds) = command;

            var validationResult = await validator.ValidateAsync(command);
            if (!validationResult.IsValid) return Result.Fail("add-product-validation");

            var product = new Product
            {
                Id = id,
                Name = name,
                Description = description,
                Price = price
            };

            if (tagIds.Count > 0)
            {
                var tags = await tagRepository.GetTagsAsync(tagIds);
                if (tagIds.Count != tags.Count) return Result.Fail("add-product-tags-count");
                product.Tags.AddRange(tags);
            }

            await productRepository.AddAsync(product);
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
                .MaximumLength(50);

            RuleFor(x => x.Description)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0);
        }
    }
}