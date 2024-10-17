using Catalog.Domain.Tags.Entities;
using Common.Application.Queries;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Application.Tags.Queries;

public static class GetTags
{
    public sealed record Query(int PageIndex, int PageSize) : IQuery<Result>;

    public sealed record Dto(Guid Id, string Name);

    public sealed record Result(List<Dto> Tags, int Total);

    public sealed class Handler(IQueryProcessor queryProcessor) : IQueryHandler<Query, Result>
    {
        public async Task<Result> HandleAsync(Query query)
        {
            var tags = await queryProcessor.Query<Tag>()
                .Skip(query.PageIndex * query.PageSize)
                .Take(query.PageSize)
                .OrderBy(t => t.Name)
                .Select(t => new Dto(t.Id, t.Name))
                .ToListAsync();

            var total = await queryProcessor.Query<Tag>()
                .CountAsync();

            return new(tags, total);
        }
    }
}