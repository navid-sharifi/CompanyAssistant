using App.Application.Services;
using App.Application.ViewModels.User.ViewModels;

namespace Application.Presentation.Controllers.User
{
    public class UserController : CRUDContriller<UserService, AddNewUserDto, GetUserDto>
    {
        public UserController(UserService userServices) : base(userServices) { }
    }
}