﻿namespace Catalog.Domain.Products.Entities;

public sealed class Product
{
    public required Guid Id { get; init; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required decimal Price { get; set; }
}