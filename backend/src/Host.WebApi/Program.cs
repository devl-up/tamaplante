using System.Text.Json.Serialization;
using Catalog.Application.Extensions;
using Host.WebApi.Routes;
using Host.WebApi.SchemaFilters;
using Infrastructure.Data.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Host.WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.CustomSchemaIds(type => type.FullName!
                .Replace("+", ".")
                .Replace("Application.", string.Empty)
                .Replace("Commands.", string.Empty)
                .Replace("Microsoft.AspNetCore.Http.", string.Empty)
                .Replace("Microsoft.AspNetCore.Mvc.", string.Empty)
            );
            options.SupportNonNullableReferenceTypes();
            options.SchemaFilter<SwaggerRequiredSchemaFilter>();
        });

        builder.Services.ConfigureHttpJsonOptions(options => { options.SerializerOptions.Converters.Add(new JsonStringEnumConverter()); });
        builder.Services.Configure<JsonOptions>(options => { options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); });
        builder.Services.AddCors(options => options.AddPolicy("Custom", configurePolicy => configurePolicy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

        builder.Services.AddProblemDetails();

        builder.Services
            .AddInfrastructureData(builder.Configuration.GetConnectionString("Postgres"))
            .AddCatalogApplication();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler();
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseStatusCodePages();
        app.UseCors("Custom");

        var api = app.MapGroup("api");
        var v1 = api.MapGroup("v1");

        v1.MapProductRoutes();

        app.Run();
    }
}