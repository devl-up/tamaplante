using Catalog.Domain.Products.Repositories;
using Common.Application.Commands;
using Common.Application.Models;
using FluentValidation;

namespace Catalog.Application.Products.Commands;

public static class DeleteProducts
{
    public sealed record Command(List<Guid> ProductIds) : ICommand;

    public sealed class Handler(IUnitOfWork unitOfWork, IProductRepository productRepository) : ICommandHandler<Command>
    {
        public async Task<Result> HandleAsync(Command command)
        {
            var products = await productRepository.GetProducts(command.ProductIds);
            if (products.Count != command.ProductIds.Count) return Result.Fail("delete-product-count");

            productRepository.Delete(products);
            await unitOfWork.CommitAsync();

            return Result.Ok();
        }
    }

    public sealed class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(p => p.ProductIds)
                .NotEmpty();
        }
    }
}