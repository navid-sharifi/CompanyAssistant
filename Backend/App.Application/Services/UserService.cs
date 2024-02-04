using App.Application.MediatR.User;
using App.Application.ViewModels.User.ViewModels;
using App.Domain.Entities;
using AutoMapper;
using MediatR;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{

    public class UserService : BaseService<User>
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public UserService(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        public Task AddUser(AddNewUserDto NewUserDto)
        {
            return _mediator.Send(_mapper.Map<AddUserRequest>(NewUserDto));
        }
    }
}

