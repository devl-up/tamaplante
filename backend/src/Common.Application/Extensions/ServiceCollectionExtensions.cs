using System.Reflection;
using Common.Application.Commands;
using Common.Application.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace Common.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddHandlers(this IServiceCollection services, Assembly assembly)
    {
        var commandHandlers = assembly.GetTypes()
            .Where(type => type.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ICommandHandler<>)))
            .ToList();

        foreach (var handler in commandHandlers)
        {
            var handlerInterface = handler.GetInterfaces().Single(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(ICommandHandler<>));
            services.AddTransient(handlerInterface, handler);
        }
        
        var queryHandlers = assembly.GetTypes()
            .Where(type => type.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IQueryHandler<,>)))
            .ToList();

        foreach (var handler in queryHandlers)
        {
            var handlerInterface = handler.GetInterfaces().Single(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IQueryHandler<,>));
            services.AddTransient(handlerInterface, handler);
        }

        return services;
    }
}