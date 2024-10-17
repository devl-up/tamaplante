using Catalog.Application.Tags.Queries;
using Common.Application.Queries;
using Microsoft.AspNetCore.Mvc;

namespace Host.WebApi.Routes;

internal static class TagRoutes
{
    internal static void MapTagRoutes(this IEndpointRouteBuilder api)
    {
        var group = api.MapGroup("tags")
            .WithTags("Tags");

        group.MapGet("", async ([FromServices] IQueryHandler<GetTags.Query, GetTags.Result> handler, [FromQuery] int pageIndex, [FromQuery] int pageSize) =>
            {
                var result = await handler.HandleAsync(new(pageIndex, pageSize));
                return Results.Ok(result);
            })
            .Produces<GetTags.Result>()
            .ProducesProblem(StatusCodes.Status500InternalServerError);
    }
}