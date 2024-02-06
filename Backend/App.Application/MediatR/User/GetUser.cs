using App.Application.IRepositories;
using App.Application.ViewModels.User.ViewModels;
using MediatR;

namespace App.Application.MediatR.User
{
    public class GetUserRequest : IRequest<GetUserDto>
    {
        public string Id { get; set; }
    }

    public class GetUserHandler : IRequestHandler<GetUserRequest, GetUserDto>
    {
        public GetUserHandler(IUserRepository repository)
        {
            _repo = repository;
        }

        private readonly IUserRepository _repo;

        public Task<GetUserDto> Handle(GetUserRequest request, CancellationToken cancellationToken)
        {
            return _repo.GetAsync<GetUserDto>(request.Id);
        }
    }
}