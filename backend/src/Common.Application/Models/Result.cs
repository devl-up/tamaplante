namespace Common.Application.Models;

public struct Result
{
    public Error? Error { get; private init; }

    public static Result Ok()
    {
        return new Result();
    }

    public static Result Fail(string errorMessage)
    {
        return new Result
        {
            Error = new Error
            {
                Description = errorMessage
            }
        };
    }
}