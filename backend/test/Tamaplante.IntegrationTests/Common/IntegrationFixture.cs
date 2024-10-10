using Infrastructure.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Respawn;
using Testcontainers.PostgreSql;

namespace Tamaplante.IntegrationTests.Common;

public sealed class IntegrationFixture : IAsyncLifetime
{
    private readonly PostgreSqlContainer _sqlContainer = new PostgreSqlBuilder().Build();
    private CustomWebApplicationFactory? _factory;
    private Respawner? _respawner;

    public CustomWebApplicationFactory Factory => _factory ??= new CustomWebApplicationFactory(_sqlContainer.GetConnectionString());

    public async Task InitializeAsync()
    {
        await _sqlContainer.StartAsync();

        await using var context = CreateDbContext();
        await context.Database.EnsureCreatedAsync();

        await using var connection = new NpgsqlConnection(_sqlContainer.GetConnectionString());
        await connection.OpenAsync();

        _respawner = await Respawner.CreateAsync(connection, new RespawnerOptions
        {
            DbAdapter = DbAdapter.Postgres
        });
    }

    public async Task DisposeAsync()
    {
        await Factory.DisposeAsync();
        await _sqlContainer.StopAsync();
    }

    public async Task ResetDatabaseAsync()
    {
        if (_respawner == null) return;
        await using var connection = new NpgsqlConnection(_sqlContainer.GetConnectionString());
        await connection.OpenAsync();
        await _respawner.ResetAsync(connection);
    }

    public AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>().UseNpgsql(_sqlContainer.GetConnectionString()).Options;
        return new AppDbContext(options);
    }
}

[CollectionDefinition("IntegrationTests")]
public sealed class IntegrationFixtureCollection : ICollectionFixture<IntegrationFixture>;