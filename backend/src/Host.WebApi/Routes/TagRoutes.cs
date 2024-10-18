using Catalog.Application.Tags.Commands;
using Catalog.Application.Tags.Queries;
using Common.Application.Commands;
using Common.Application.Queries;
using Host.WebApi.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Host.WebApi.Routes;

internal static class TagRoutes
{
    internal static void MapTagRoutes(this IEndpointRouteBuilder api)
    {
        var group = api.MapGroup("tags")
            .WithTags("Tags");

        group.MapGet("", async ([FromServices] IQueryHandler<GetTags.Query, GetTags.Result> handler, [FromQuery] int? pageIndex, [FromQuery] int? pageSize) =>
            {
                var result = await handler.HandleAsync(new(pageIndex, pageSize));
                return Results.Ok(result);
            })
            .Produces<GetTags.Result>()
            .ProducesProblem(StatusCodes.Status500InternalServerError);

        group.MapPost("", async ([FromServices] ICommandHandler<AddTag.Command> handler, [FromBody] AddTag.Command command) =>
            {
                var result = await handler.HandleAsync(command);
                return result.ToHttp();
            })
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status500InternalServerError);

        group.MapPut("", async ([FromServices] ICommandHandler<EditTag.Command> handler, [FromBody] EditTag.Command command) =>
            {
                var result = await handler.HandleAsync(command);
                return result.ToHttp();
            })
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status500InternalServerError);

        group.MapDelete("", async ([FromServices] ICommandHandler<DeleteTags.Command> handler, [FromBody] DeleteTags.Command command) =>
            {
                var result = await handler.HandleAsync(command);
                return result.ToHttp();
            })
            .Produces(StatusCodes.Status204NoContent)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status500InternalServerError);
    }
}