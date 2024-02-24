using App.Application.IRepositories;
using App.Application.ViewModels.Column.ViewModels;
using App.Domain.Entities;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{
    public class ColumnService : BaseService<Board>
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly BoardService _boardService;
        private readonly IProjectRepository _projectRepository;
        private readonly IColumnRepository _columnRepository;
        private readonly ProjectService _projectService;
        public ColumnService(IMapper mapper, UserService userService, IProjectRepository projectRepository, ProjectService projectService, IColumnRepository columnRepository, BoardService boardService)
        {
            _mapper = mapper;
            _userService = userService;
            _projectRepository = projectRepository;
            _projectService = projectService;

            _columnRepository = columnRepository;
            _boardService = boardService;
        }


        private Task<bool> UserCanAdd(string boardId)
        {
            return _boardService.UserCanAdd(boardId);
        }
        private Task<bool> UserCanRead(string boardId)
        {
            return _boardService.UserCanRead(boardId);
        }
        private Task<bool> UserCanDelete(string boardId)
        {
            return _boardService.UserCanDelete(boardId);
        }
        private Task<bool> UserCanUpdate(string boardId)
        {
            return _boardService.UserCanUpdate(boardId);
        }


        public async Task Add(AddColumnVM addColumn)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");
            var userCanAdd = await UserCanAdd(addColumn.BoardId.ToString());

            if (!userCanAdd)
                throw new ValidationException("You don't have access to this board");

            var column = _mapper.Map<Column>(addColumn);
            column.CreatorUserId = user._id;


            ///check it with max order
            var maxOrder = (await _columnRepository.Max(c => c.Order))?.Order ?? 0;
            column.Order = ++maxOrder;

            await _columnRepository.CreateAsync(column);
        }

        public async Task<IList<GetColumnVM>> GetAll(string boardId)
        {
            bool userCanRead = await UserCanRead(boardId);
            if (!userCanRead)
                throw new ValidationException("You don't have access to this board");

            return await _columnRepository.GetAllAsync<GetColumnVM>(c => c.BoardId == boardId);
        }

        public async Task<GetColumnVM> Get(string columnId)
        {
            var column = await _columnRepository.GetAsync<GetColumnVM>(c => c._id == columnId);
            if (column is null)
                throw new ValidationException("The column not found.");

            bool userCanRead = await UserCanRead(column.BoardId);
            if (!userCanRead)
                throw new ValidationException("You don't have access to this board");

            return column;
        }

        public async Task Delete(string columnId)
        {
            var column = await _columnRepository.GetAsync<GetColumnVM>(c => c._id == columnId);
            if (column is null)
                throw new ValidationException("The column not found.");

            bool userCanDelete = await UserCanDelete(column.BoardId);
            if (!userCanDelete)
                throw new ValidationException("You don't have access to this board");

            await _columnRepository.DeleteAsync(columnId);
        }

        public async Task Update(UpdateColumnVM updateColumn)
        {

            var column = await _columnRepository.GetAsync(c => c._id == updateColumn.Id.ToString());
            if (column is null)
                throw new ValidationException("the column not found");

            bool userCanUpdate = await UserCanUpdate(column.BoardId);
            if (!userCanUpdate)
                throw new ValidationException("You don't have access to this board");

            var newColumn = _mapper.Map(updateColumn, column);
            await _columnRepository.UpdateAsync(newColumn);
        }
    }

}