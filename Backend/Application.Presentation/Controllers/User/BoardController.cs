using App.Application.Services;
using App.Application.ViewModels.Board.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers.User
{
    [Authorize(Roles = "user")]
    public class BoardController : BaseApiController
    {
        private readonly BoardService _boardService;

        public BoardController(BoardService boardService)
        {
            _boardService = boardService;
        }

        [HttpPost]
        public Task Create([FromBody] AddBoardVM AddBoard)
        {
            return _boardService.Add(AddBoard);
        }

        [HttpPut]
        public Task Update([FromBody] UpdateBoardVM updateBoard)
        {
            return _boardService.Update(updateBoard);
        }


        [HttpGet]
        [Route("{projectId}")]
        public Task<IList<GetBoardVM>> GetAll(Guid projectId)
        {
            return _boardService.GetAll(projectId.ToString());
        }

        [HttpDelete]
        [Route("{id}")]
        public Task Delete(Guid id)
        {
            return _boardService.Delete(id.ToString());
        }

    }

}