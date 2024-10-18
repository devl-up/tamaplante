namespace Catalog.Domain.Tags.Entities;

public sealed class Tag
{
    public required Guid Id { get; init; }
    public required string Name { get; set; }
}