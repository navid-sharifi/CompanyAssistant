using App.Application.IRepositories;
using App.Persistence.Database.MongoDb.Repository;
using AutoMapper;
using MongoDB.Driver;

namespace App.Persistence.Repositoriess
{
    public class TaskRepository : Repository<Domain.Entities.Task>, ITaskRepository
    {
        public TaskRepository(IMongoDatabase db, IMapper mapper) : base(db, mapper)
        {
        }
    }
}