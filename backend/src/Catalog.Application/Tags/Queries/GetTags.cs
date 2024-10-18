using Catalog.Domain.Tags.Entities;
using Common.Application.Queries;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Application.Tags.Queries;

public static class GetTags
{
    public sealed record Query(int? PageIndex, int? PageSize) : IQuery<Result>;

    public sealed record Dto(Guid Id, string Name);

    public sealed record Result(List<Dto> Tags, int Total);

    public sealed class Handler(IQueryProcessor queryProcessor) : IQueryHandler<Query, Result>
    {
        public async Task<Result> HandleAsync(Query query)
        {
            var tagsQuery = queryProcessor.Query<Tag>();

            if (query is { PageIndex: not null, PageSize: not null })
                tagsQuery = tagsQuery
                    .Skip(query.PageIndex.Value * query.PageSize.Value)
                    .Take(query.PageSize.Value);

            var tags = await tagsQuery
                .OrderBy(t => t.Name)
                .Select(t => new Dto(t.Id, t.Name))
                .ToListAsync();

            var total = await queryProcessor.Query<Tag>()
                .CountAsync();

            return new(tags, total);
        }
    }
}