﻿using App.Application.IRepositories;
using App.Domain.Entities;
using App.Persistence.Database.MongoDb.Repository;
using MongoDB.Driver;

namespace App.Infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IMongoDatabase db) : base(db)
        {
        }
    }
}
