using App.Application.IRepositories;
using App.Application.ViewModels.Board.ViewModels;
using App.Application.ViewModels.Project.ViewModels;
using App.Domain.Entities;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{
    public class BoardService : BaseService<Board>
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly IProjectRepository _projectRepository;
        private readonly IBoardRepository _boardRepository;
        private readonly CompanyService _companyService;
        private readonly ProjectService _projectService;
        public BoardService(IMapper mapper, UserService userService, IProjectRepository projectRepository, CompanyService companyService, ProjectService projectService, IBoardRepository boardRepository)
        {
            _mapper = mapper;
            _userService = userService;
            _projectRepository = projectRepository;
            _companyService = companyService;
            _projectService = projectService;
            _boardRepository = boardRepository;
        }


        public async Task Add(AddBoardVM addBoard)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var project = await _projectService.GetCurrentUserProject(addBoard.ProjectId.ToString());
            if (project is null)
                throw new ValidationException("project not found");

            var board = _mapper.Map<Board>(addBoard);
            board.CreatorUserId = user._id;

            await _boardRepository.CreateAsync(board);
        }

        public async Task<IList<GetBoardVM>> GetAll(string projectId)
        {
            var project = await _projectService.GetCurrentUserProject(projectId);
            if (project is null)
                throw new ValidationException("project not found");

            return await _boardRepository.GetAllAsync<GetBoardVM>(c => c.ProjectId == projectId);
        }

        public async Task<GetProjectVM> GetCurrentUserBoard(string boardId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            return await _projectRepository.GetAsync<GetProjectVM>(c => c._id == boardId && c.CreatorUserId == user._id);
        }

        public async Task Delete(string boardId)
        {
            var board = await GetCurrentUserBoard(boardId);
            if (board is null)
                throw new ValidationException("board not found");

            await _boardRepository.DeleteAsync(board._id);
        }

        public async Task Update(UpdateBoardVM updateBoard)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var board = await _boardRepository.GetAsync(c => c._id == updateBoard.Id.ToString() && c.CreatorUserId == user._id);
            if (board is null)
                throw new ValidationException("board not found");

            var newBoard = _mapper.Map(updateBoard, board);
            await _boardRepository.UpdateAsync(newBoard);
        }
    }

}