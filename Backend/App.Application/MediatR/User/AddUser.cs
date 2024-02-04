using App.Application.IRepositories;
using AutoMapper;
using MediatR;

namespace App.Application.MediatR.User
{
    public class AddUserRequest : IRequest
    {
        public string Name { get; set; }
    }

    public class AddUserHandler : IRequestHandler<AddUserRequest>
    {
        public AddUserHandler(IUserRepository repository, IMapper mapper)
        {
            _repo = repository;
            this.mapper = mapper;
        }

        private readonly IUserRepository _repo;
        private readonly IMapper mapper;

        public Task Handle(AddUserRequest request, CancellationToken cancellationToken)
        {
            return _repo.CreateAsync(mapper.Map<App.Domain.Entities.User>(request));
        }
    }
}