namespace Common.Application.Queries;

public interface IQueryProcessor
{
    IQueryable<T> Query<T>() where T : class;
}