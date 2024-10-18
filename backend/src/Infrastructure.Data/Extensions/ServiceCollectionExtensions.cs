using Catalog.Domain.Products.Repositories;
using Catalog.Domain.Tags.Repositories;
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
        services.AddDbContext<AppDbContext>(builder => builder.UseNpgsql(connectionString));
        services.AddScoped<IUnitOfWork, EfUnitOfWork>();
        services.AddTransient<IQueryProcessor, EfQueryProcessor>();

        services.AddTransient<IProductRepository, EfProductRepository>();
        services.AddTransient<ITagRepository, EfTagRepository>();

        return services;
    }
}