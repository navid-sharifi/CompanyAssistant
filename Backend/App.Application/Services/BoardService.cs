using App.Application.IRepositories;
using App.Application.ViewModels.Board.ViewModels;
using App.Application.ViewModels.Column.ViewModels;
using App.Application.ViewModels.Project.ViewModels;
using App.Application.ViewModels.Task.ViewModels;
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
        private readonly IColumnRepository _columnRepository;
        private readonly ITaskRepository _taskRepository;
        private readonly ProjectService _projectService;

        public BoardService(IMapper mapper, UserService userService, IProjectRepository projectRepository, ProjectService projectService, IBoardRepository boardRepository, IColumnRepository columnRepository, ITaskRepository taskRepository)
        {
            _mapper = mapper;
            _userService = userService;
            _projectRepository = projectRepository;

            _projectService = projectService;
            _boardRepository = boardRepository;
            _columnRepository = columnRepository;
            _taskRepository = taskRepository;
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
        public async Task<GetBoardVM> Get(string boardId)
        {
            await CheckUserCanRead(boardId);
            return await _boardRepository.GetAsync<GetBoardVM>(c => c._id == boardId);
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



        internal async Task<bool> CheckUserCanAdd(string boardId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var board = await _boardRepository.GetAsync(boardId);
            if (board?.CreatorUserId == user._id)
                return true;

            throw new ValidationException("You don't have access to this board");
        }

        internal async Task<bool> CheckUserCanRead(string boardId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var board = await _boardRepository.GetAsync(boardId);
            if (board?.CreatorUserId == user._id)
                return true;

            throw new ValidationException("You don't have access to this board");
        }

        internal async Task<bool> CheckUserCanDelete(string boardId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var board = await _boardRepository.GetAsync(boardId);
            if (board?.CreatorUserId == user._id)
                return true;

            throw new ValidationException("You don't have access to this board");
        }
        internal async Task<bool> CheckUserCanUpdate(string boardId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var board = await _boardRepository.GetAsync(boardId);
            if (board?.CreatorUserId == user._id)
                return true;

            throw new ValidationException("You don't have access to this board");
        }


        public async Task<GetBoardVM?> GetWithTasks(string boardId)
        {
            var board = await Get(boardId);
            var columns = await _columnRepository.GetAllAsync<GetColumnVM>(c => c.BoardId == board._id);
            var tasks = await _taskRepository.GetAllAsync<GetTaskVM>(c => columns.Any(x => x._id == c.ColumnId));

            foreach (var column in columns)
                column.Tasks = tasks.Where(c => c.ColumnId == column._id).ToArray();

            if (board is not null)
                board.Columns = columns;

            return board;
        }
    }

}