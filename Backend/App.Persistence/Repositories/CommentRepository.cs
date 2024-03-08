using App.Application.IRepositories;
using App.Domain.Entities;
using App.Persistence.Database.MongoDb.Repository;
using AutoMapper;
using MongoDB.Driver;

namespace App.Persistence.Repositoriess
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(IMongoDatabase db, IMapper mapper) : base(db, mapper)
        {
        }
    }
}
