namespace Common.Application.Models;

public struct Result
{
    public Error? Error { get; private init; }

    public static Result Ok()
    {
        return new();
    }

    public static Result Fail(string errorMessage)
    {
        return new()
        {
            Error = new()
            {
                Description = errorMessage
            }
        };
    }
}