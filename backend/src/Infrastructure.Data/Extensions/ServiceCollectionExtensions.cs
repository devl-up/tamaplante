using Catalog.Domain.Products.Repositories;
using Common.Application.Commands;
using Common.Application.Queries;
using Infrastructure.Data.Common;
using Infrastructure.Data.Contexts;
using Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Data.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructureData(this IServiceCollection services, string? connectionString)
    {
        if (string.IsNullOrWhiteSpace(connectionString)) throw new ArgumentNullException(nameof(connectionString));

        services.AddDbContext<AppDbContext>(builder => builder.UseNpgsql(connectionString));
        services.AddScoped<IUnitOfWork, EfUnitOfWork>();
        services.AddTransient<IQueryProcessor, EfQueryProcessor>();
        
        services.AddTransient<IProductRepository, EfProductRepository>();

        return services;
    }
}