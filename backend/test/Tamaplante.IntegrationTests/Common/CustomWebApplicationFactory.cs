using Host.WebApi;
using Infrastructure.Data.Contexts;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Tamaplante.IntegrationTests.Common;

public sealed class CustomWebApplicationFactory(string connectionString) : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureTestServices(services =>
        {
            services.Remove(services.Single(service => typeof(DbContextOptions<AppDbContext>) == service.ServiceType));
            services.Remove(services.Single(service => typeof(AppDbContext) == service.ServiceType));
            services.AddDbContext<AppDbContext>(optionsBuilder => optionsBuilder.UseNpgsql(connectionString));
        });
    }
}