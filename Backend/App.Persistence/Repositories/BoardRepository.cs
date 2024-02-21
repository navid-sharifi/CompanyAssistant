using App.Application.IRepositories;
using App.Domain.Entities;
using App.Persistence.Database.MongoDb.Repository;
using AutoMapper;
using MongoDB.Driver;

namespace App.Persistence.Repositoriess
{
    public class BoardRepository : Repository<Board>, IBoardRepository
    {
        public BoardRepository(IMongoDatabase db, IMapper mapper) : base(db, mapper)
        {
        }
    }
}
