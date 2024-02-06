using App.Application.Services;
using App.Application.ViewModels.User.ViewModels;
using Application.Presentation.Filter;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiResultFilter]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {

    }


    public abstract class CRUDContriller<TService, TAdd> : ControllerBase where TService : ICRUDService<TAdd>
    {
        public TService _service { get; }

        public CRUDContriller(TService service)
        {
            _service = service;
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
