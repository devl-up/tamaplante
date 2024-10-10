using System.Reflection;
using Common.Application.Extensions;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Catalog.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCatalogApplication(this IServiceCollection services)
    {
        return services
            .AddValidatorsFromAssembly(Assembly.GetExecutingAssembly(), includeInternalTypes: true)
            .AddCommandHandlers(Assembly.GetExecutingAssembly())
            .AddQueryHandlers(Assembly.GetExecutingAssembly());
    }
}