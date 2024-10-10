using Common.Application.Models;

namespace Common.Application.Commands;

public interface ICommandHandler<in T> where T : ICommand
{
    Task<Result> HandleAsync(T command);
}