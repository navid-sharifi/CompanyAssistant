using App.Application.Services;
using App.Application.ViewModels.Column.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers.User
{
    [Authorize(Roles = "user")]
    public class ColumnController : BaseApiController
    {
        private readonly ColumnService _columnService;

        public ColumnController(ColumnService columnService)
        {
            _columnService = columnService;
        }

        [HttpPost]
        public Task Create([FromBody] AddColumnVM addColumn)
        {
            return _columnService.Add(addColumn);
        }

        [HttpPut]
        public Task Update([FromBody] UpdateColumnVM updateColumn)
        {
            return _columnService.Update(updateColumn);
        }

        [HttpGet]
        [Route("{boardId}")]
        public Task<IList<GetColumnVM>> GetAll(Guid boardId)
        {
            return _columnService.GetAll(boardId.ToString());
        }

        [HttpDelete]
        [Route("{id}")]
        public Task Delete(Guid id)
        {
            return _columnService.Delete(id.ToString());
        }

    }

}