﻿using Catalog.Application.Products.Commands;
using Catalog.Application.Products.Queries;
using Common.Application.Commands;
using Common.Application.Queries;
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

        group.MapGet("", async ([FromServices] IQueryHandler<GetProducts.Query, GetProducts.Result> handler, [FromQuery] int pageIndex, [FromQuery] int pageSize) =>
            {
                var result = await handler.HandleAsync(new(pageIndex, pageSize));
                return Results.Ok(result);
            })
            .Produces<GetProducts.Result>()
            .ProducesProblem(StatusCodes.Status500InternalServerError);
    }
}