using App.Application.Services;
using App.Application.ViewModels.User.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers.User
{


    public class UserController : BaseApiController
    {

        public UserService _userServices { get; }

        public UserController(UserService userServices)
        {
            _userServices = userServices;
        }

        [HttpPost]
        public Task Add(AddNewUserDto model)
        {
            return _userServices.AddUser(model);
        }

    }
}
