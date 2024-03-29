﻿
namespace App.Application.IRepositories
{
    using App.Domain.Entities;
    using System.Linq.Expressions;
    using Task = System.Threading.Tasks.Task;

    public interface IRepository<T> where T : BaseEntity
    {
        Task CreateAsync(T entity);
        Task DeleteAsync(string id);
        Task<IList<T>> GetAllAsync();
        Task<T?> Max(Expression<Func<T, object>> filter);
        Task<IList<TDto>> GetAllAsync<TDto>();
        Task<IList<TDto>> GetAllAsync<TDto>(Expression<Func<T, bool>> filter);
        Task<IReadOnlyCollection<T>> GetAllAsync(Expression<Func<T, bool>> filter);
        Task<T?> GetAsync(string id, CancellationToken cancellationToken = default(CancellationToken));
        Task<TDto> GetAsync<TDto>(string id, CancellationToken cancellationToken = default(CancellationToken));
        Task<T?> GetAsync(Expression<Func<T, bool>> filter, CancellationToken cancellationToken = default(CancellationToken));
        Task<TDto> GetAsync<TDto>(Expression<Func<T, bool>> filter, CancellationToken cancellationToken = default(CancellationToken));
        Task UpdateAsync(T entity, CancellationToken cancellationToken = default(CancellationToken));
    }
}
