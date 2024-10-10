using System.Net;
using Common.Application.Models;

namespace Host.WebApi.Extensions;

internal static class ResultExtensions
{
    internal static IResult ToHttp(this Result result)
    {
        return result.Error switch
        {
            null => Results.NoContent(),
            _ => Results.Problem(result.Error.Description, statusCode: (int) HttpStatusCode.BadRequest)
        };
    }
}