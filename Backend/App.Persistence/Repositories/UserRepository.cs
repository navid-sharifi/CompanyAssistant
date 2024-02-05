using App.Application.IRepositories;
using App.Domain.Entities;
using App.Persistence.Database.MongoDb.Repository;
using AutoMapper;
using MongoDB.Driver;

namespace App.Persistence.Repositoriess
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IMongoDatabase db, IMapper mapper) : base(db, mapper)
        {
        }
    }
}
