using App.Application.MediatR.User;
using App.Application.ViewModels.User.ViewModels;
using App.Domain.Entities;
using AutoMapper;
using MediatR;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{

    public class UserService : BaseService<User>, ICRUDService<AddNewUserDto, GetUserDto>
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public UserService(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        public Task Add(AddNewUserDto user)
        {
            return _mediator.Send(_mapper.Map<AddUserRequest>(user));
        }

        public Task Delete(string id)
        {
            return _mediator.Send(new DeleteUserRequest { Id = id });
        }

        public Task<GetUserDto> Get(string id)
        {
            return _mediator.Send(new GetUserRequest { Id = id });
        }
        public Task<IList<GetUserDto>> GetAll()
        {
            return _mediator.Send(new GetAllUserRequest());
        }
    }
}

