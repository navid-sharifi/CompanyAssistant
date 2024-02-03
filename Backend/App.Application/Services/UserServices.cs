using App.Application.MediatR.User;
using App.Application.ViewModels.User.ViewModels;
using MediatR;

namespace App.Application.Services
{
    public class UserServices
    {
        private IMediator _mediator;

        public UserServices(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task AddUser(AddNewUserDto NewUserDto)
        {

            await _mediator.Send(new AddUserRequest());

        }
    }

}
