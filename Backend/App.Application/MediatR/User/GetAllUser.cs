using App.Application.IRepositories;
using App.Application.ViewModels.User.ViewModels;
using AutoMapper;
using MediatR;

namespace App.Application.MediatR.User
{
    public class GetAllUserRequest : IRequest<IList<GetUserDto>>
    {
    }

    public class GetAllUserHandler : IRequestHandler<GetAllUserRequest, IList<GetUserDto>>
    {
        public GetAllUserHandler(IUserRepository repository, IMapper mapper)
        {
            _repo = repository;
            this.mapper = mapper;
        }

        private readonly IUserRepository _repo;
        private readonly IMapper mapper;

        public Task<IList<GetUserDto>> Handle(GetAllUserRequest request, CancellationToken cancellationToken)
        {
            return _repo.GetAllAsync<GetUserDto>();
        }
    }
}