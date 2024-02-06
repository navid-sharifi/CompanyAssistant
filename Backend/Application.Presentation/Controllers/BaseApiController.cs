﻿using App.Application.Services;
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

    public abstract class CRUDContriller<TService, TAdd, TGet> : ControllerBase where TService : ICRUDService<TAdd, TGet>
    {
        public TService _service { get; }

        public CRUDContriller(TService service)
        {
            _service = service;
        }

        [HttpPost]
        public virtual Task Add(TAdd model)
        {
            return _service.Add(model);
        }

        [HttpGet]
        public virtual Task<IList<TGet>> Get()
        {
            return _service.GetAll();
        }

        [HttpGet]
        [Route("{id}")]
        public virtual Task<TGet> GetOne(Guid id)
        {
            return _service.Get(id.ToString());
        }

        [HttpDelete]
        [Route("{id}")]
        public virtual Task Delete(Guid id)
        {
            return _service.Delete(id.ToString());
        }

    }

}
