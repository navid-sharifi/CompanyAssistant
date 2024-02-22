using App.Application.IRepositories;
using App.Domain.Entities;
using App.Persistence.Database.MongoDb.Repository;
using AutoMapper;
using MongoDB.Driver;

namespace App.Persistence.Repositoriess
{
    public class ColumnRepository : Repository<Column>, IColumnRepository
    {
        public ColumnRepository(IMongoDatabase db, IMapper mapper) : base(db, mapper)
        {
        }
    }
}
