using App.Application.Services;
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

    public abstract class CRUDContriller<TService, TAdd, TGet> : BaseApiController where TService : ICRUDService<TAdd, TGet>
    {
        public TService _service { get; }

        public CRUDContriller(TService service)
        {
            _service = service;
        }

        [HttpPost]
        public Task Add(TAdd model)
        {
            return _service.Add(model);
        }

        [HttpGet]
        public async Task<IEnumerable<TGet>> User()
        {
            var data = await _service.GetAll();
            return data.Reverse();
        }


        //[HttpGet]
        //[Route("{id}")]
        //public Task<TGet> GetOne(Guid id)
        //{
        //    return _service.Get(id.ToString());
        //}

        [HttpDelete]
        [Route("{id}")]
        public Task Delete(Guid id)
        {
            return _service.Delete(id.ToString());
        }

    }

}
