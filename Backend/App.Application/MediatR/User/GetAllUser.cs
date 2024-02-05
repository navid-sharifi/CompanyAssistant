using App.Application.IRepositories;
using AutoMapper;
using MediatR;

namespace App.Application.MediatR.User
{
    public class GetAllUserRequest : IRequest
    {

    }

    public class GetAllUserHandler : IRequestHandler<GetAllUserRequest>
    {
        public GetAllUserHandler(IUserRepository repository, IMapper mapper)
        {
            _repo = repository;
            this.mapper = mapper;
        }

        private readonly IUserRepository _repo;
        private readonly IMapper mapper;

        public Task Handle(GetAllUserRequest request, CancellationToken cancellationToken)
        {
            return _repo.CreateAsync(mapper.Map<App.Domain.Entities.User>(request));
        }
    }
}