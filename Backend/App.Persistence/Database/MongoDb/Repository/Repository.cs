using App.Application.IRepositories;
using App.Domain.Entities;
using App.Domain.Validation;
using AutoMapper;
using MongoDB.Driver;
using System.Data;
using System.Linq.Expressions;
using Task = System.Threading.Tasks.Task;

namespace App.Persistence.Database.MongoDb.Repository
{

    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly IMongoCollection<T> dbCollection;
        private readonly FilterDefinitionBuilder<T> filterBuilder = Builders<T>.Filter;
        private readonly IMapper mapper;

        public Repository(IMongoDatabase db, IMapper mapper)
        {
            dbCollection = db.GetCollection<T>(typeof(T).Name);
            this.mapper = mapper;
        }
        private bool IsValid(T entity)
        {
            var type = typeof(BaseEntity).Assembly.GetExportedTypes()
                                 .Where(c => c.IsClass && !c.IsAbstract && c.IsPublic && c.BaseType == typeof(BaseValidator<T>)).FirstOrDefault();
            if (type is null)
                return true;

            var validator = Activator.CreateInstance(type, entity) as IDomainValidator;

            if (!validator.IsValid())
                throw new EntityNotValidException("Not valid data", validator.GetErrors());

            return true;
        }


        public async Task CreateAsync(T entity)
        {
            if (entity == null || !IsValid(entity))
                throw new ArgumentNullException();

            await dbCollection.InsertOneAsync(entity);
        }

        public async Task DeleteAsync(string id)
        {
            FilterDefinition<T> filter = filterBuilder.Eq(x => x._id, id);
            await dbCollection.DeleteOneAsync(filter);
        }

        public async Task<IList<T>> GetAllAsync()
        {
            return await dbCollection.Find(filterBuilder.Empty).ToListAsync();
        }

        public async Task<IList<TDto>> GetAllAsync<TDto>()
        {
            var list = await dbCollection.Find(filterBuilder.Empty).ToListAsync();
            return list.Select(c => mapper.Map<TDto>(c)).ToArray();
        }
        public async Task<IList<TDto>> GetAllAsync<TDto>(Expression<Func<T, bool>> filter)
        {
            var list = await GetAllAsync(filter);
            return list.Select(c => mapper.Map<TDto>(c)).ToArray();
        }


        public async Task<IReadOnlyCollection<T>> GetAllAsync(Expression<Func<T, bool>> filter)
        {
            return await dbCollection.Find(filter).ToListAsync();
        }

        public async Task<T?> Max(Expression<Func<T, object>> filter)
        {
            return await dbCollection.Find(filterBuilder.Empty).SortByDescending(filter).Limit(1).FirstOrDefaultAsync();
        }

        public Task<T?> GetAsync(string id, CancellationToken cancellationToken = default(CancellationToken))
        {
            return GetAsync(c => c._id == id, cancellationToken);
        }
        public async Task<TDto> GetAsync<TDto>(string id, CancellationToken cancellationToken = default(CancellationToken))
        {
            var entity = await GetAsync(id, cancellationToken);
            return mapper.Map<TDto>(entity);
        }

        public async Task<T?> GetAsync(Expression<Func<T, bool>> filter, CancellationToken cancellationToken = default(CancellationToken))
        {
            return await dbCollection.Find(filter).Limit(1).FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<TDto> GetAsync<TDto>(Expression<Func<T, bool>> filter, CancellationToken cancellationToken = default)
        {
            var entity = await GetAsync(filter, cancellationToken);
            return mapper.Map<TDto>(entity);
        }
        public async Task UpdateAsync(T entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            if (entity == null)
                throw new ArgumentNullException();

            FilterDefinition<T> filter = filterBuilder.Eq(x => x._id, entity._id);
            await dbCollection.ReplaceOneAsync(filter, entity, cancellationToken: cancellationToken);
        }
    }
}

