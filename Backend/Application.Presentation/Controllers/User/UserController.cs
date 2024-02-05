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

        [HttpGet]
        public Task<IList<GetUserDto>> Get()
        {
            return _userServices.GetAll();
        }

        [HttpGet]
        [Route("{id}")]
        public Task GetOne(Guid id)
        {
            return Task.CompletedTask;
            //return _userServices.AddUser(model);
        }

    }
}
