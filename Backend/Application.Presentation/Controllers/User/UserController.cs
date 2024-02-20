using App.Application.Services;
using App.Application.ViewModels.User.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers.User
{
    [Authorize(Roles = "Admin")]
    public class UserController : CRUDContriller<UserService, AddNewUserDto, GetUserDto>
    {
        private readonly UserService _userService;
        public UserController(UserService userServices, UserService userService) : base(userServices)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("passwordLogin")]
        public Task<string> PasswordLogin([FromBody] PasswordLoginVM user)
        {
            return _userService.PasswordLogin(user);
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public Task Register([FromBody] RegisterUserVM user)
        {
            return _userService.Register(user);
        }

    }

}