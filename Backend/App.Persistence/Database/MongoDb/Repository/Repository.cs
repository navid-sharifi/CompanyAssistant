﻿using App.Application.IRepositories;
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


        //public async Task<IReadOnlyCollection<T>> GetAllAsync()
        //{
        //    return await dbCollection.Find(filterBuilder.Empty).ToListAsync();
        //}

        //public IFindFluent<T, T> QueryAble(Expression<Func<T, bool>> filter)
        //{
        //    return dbCollection.Find(filter);
        //}

        //public IFindFluent<T, T> QueryAble()
        //{
        //    return dbCollection.Find(filterBuilder.Empty);
        //}


        //public async Task<IReadOnlyCollection<T>> GetAllAsync(Expression<Func<T, bool>> filter)
        //{
        //    return await dbCollection.Find(filter).ToListAsync();
        //}

        //public async Task<T?> GetAsync(Guid id, CancellationToken cancellationToken = default(CancellationToken))
        //{
        //    FilterDefinition<T> filter = filterBuilder.Eq(x => x.Id, id);
        //    return await dbCollection.Find(filter).FirstOrDefaultAsync(cancellationToken);
        //}

        //public async Task<T> GetAsync(Expression<Func<T, bool>> filter)
        //{
        //    return await dbCollection.Find(filter).FirstOrDefaultAsync();
        //}

        //public async Task CreateAsync(T entity)
        //{
        //    if (entity == null)
        //    {
        //        throw new ArgumentNullException();
        //    }

        //    await dbCollection.InsertOneAsync(entity);
        //}

        //public async Task UpdateAsync(T entity)
        //{
        //    if (entity == null)
        //    {
        //        throw new ArgumentNullException();
        //    }

        //    FilterDefinition<T> filter = filterBuilder.Eq(x => x.Id, entity.Id);
        //    await dbCollection.ReplaceOneAsync(filter, entity);
        //}

        //public async Task DeleteAsync(Guid id)
        //{
        //    FilterDefinition<T> filter = filterBuilder.Eq(x => x.Id, id);
        //    await dbCollection.DeleteOneAsync(filter);
        //}

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
        public async Task<IReadOnlyCollection<T>> GetAllAsync(Expression<Func<T, bool>> filter)
        {
            return await dbCollection.Find(filter).ToListAsync();
        }

        public Task<T?> GetAsync(string id, CancellationToken cancellationToken = default(CancellationToken))
        {
            return GetAsync(c => c._id == id, cancellationToken);
        }

        public async Task<T?> GetAsync(Expression<Func<T, bool>> filter, CancellationToken cancellationToken = default(CancellationToken))
        {
            return await dbCollection.Find(filter).FirstOrDefaultAsync(cancellationToken);
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

