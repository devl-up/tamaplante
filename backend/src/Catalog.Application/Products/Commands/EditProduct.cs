using Catalog.Domain.Products.Repositories;
using Common.Application.Commands;
using Common.Application.Models;
using FluentValidation;

namespace Catalog.Application.Products.Commands;

public static class EditProduct
{
    public sealed record Command(Guid Id, string Name, string Description, decimal Price) : ICommand;

    public sealed class Handler(IUnitOfWork unitOfWork, IProductRepository productRepository, IValidator<Command> validator) : ICommandHandler<Command>
    {
        public async Task<Result> HandleAsync(Command command)
        {
            var (id, name, description, price) = command;

            var validationResult = await validator.ValidateAsync(command);
            if (!validationResult.IsValid) return Result.Fail("edit-product-validation");

            var product = await productRepository.GetByIdAsync(id);

            product.Name = name;
            product.Description = description;
            product.Price = price;

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