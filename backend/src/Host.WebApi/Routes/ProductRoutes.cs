using Catalog.Application.Products.Commands;
using Common.Application.Commands;
using Host.WebApi.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Host.WebApi.Routes;

internal static class ProductRoutes
{
    internal static void MapProductRoutes(this IEndpointRouteBuilder api)
    {
        var group = api.MapGroup("products")
            .WithTags("Products");

        group.MapPost("", async ([FromServices] ICommandHandler<AddProduct.Command> handler, [FromBody] AddProduct.Command command) =>
            {
                var result = await handler.HandleAsync(command);
                return result.ToHttp();
            })
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status500InternalServerError);
    }
}