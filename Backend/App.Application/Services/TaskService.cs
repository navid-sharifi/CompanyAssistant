using App.Application.IRepositories;
using App.Application.ViewModels.Task.ViewModels;
using App.Domain.Entities;
using AutoMapper;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{
    public class TaskService : BaseService<Domain.Entities.Task>
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly BoardService _boardService;
        private readonly IColumnRepository _columnRepository;
        private readonly ITaskRepository _taskRepository;

        public TaskService(IMapper mapper, UserService userService, IColumnRepository columnRepository, BoardService boardService, ITaskRepository taskRepository)
        {
            _mapper = mapper;
            _userService = userService;
            _columnRepository = columnRepository;
            _boardService = boardService;
            _taskRepository = taskRepository;
        }


        public async Task CheckUserCanAddWithTaskId(string taskId)
        {

            var task = await _taskRepository.GetAsync<GetTaskVM>(c => c._id == taskId);
            if (task is null)
                throw new ValidationException("The task not found.");
            var column = await EnsureColumnExist(task.ColumnId);
            await CheckUserCanRead(column.BoardId);
        }

        private Task<bool> CheckUserCanAdd(string boardId)
        {
            return _boardService.CheckUserCanAdd(boardId);
        }
        private Task<bool> CheckUserCanRead(string boardId)
        {
            return _boardService.CheckUserCanRead(boardId);
        }
        private Task<bool> CheckUserCanDelete(string boardId)
        {
            return _boardService.CheckUserCanDelete(boardId);
        }
        private Task<bool> CheckUserCanUpdate(string boardId)
        {
            return _boardService.CheckUserCanUpdate(boardId);
        }

        private async Task<Column> EnsureColumnExist(string columnId)
        {
            var column = await _columnRepository.GetAsync(columnId.ToString());
            if (column is null)
                throw new ValidationException("The column not found.");

            return column;
        }

        public async Task Add(AddTaskVM addTask)
        {
            var column = await EnsureColumnExist(addTask.ColumnId);
            await CheckUserCanAdd(column.BoardId.ToString());
            var user = await _userService.CurrentUser();

            var task = _mapper.Map<Domain.Entities.Task>(addTask);
            task.CreatorUserId = user._id;

            await _taskRepository.CreateAsync(task);
        }

        public async Task<IList<GetTaskVM>> GetAll(string columnId)
        {
            var column = await EnsureColumnExist(columnId);
            await CheckUserCanRead(column.BoardId);

            return await _taskRepository.GetAllAsync<GetTaskVM>(c => c.ColumnId == columnId);
        }

        public async Task<GetTaskVM> Get(string taskId)
        {
            var task = await _taskRepository.GetAsync<GetTaskVM>(c => c._id == taskId);
            if (task is null)
                throw new ValidationException("The task not found.");

            var column = await EnsureColumnExist(task.ColumnId);
            await CheckUserCanRead(column.BoardId);

            return task;
        }

        public async Task Delete(string taskId)
        {
            var task = await _taskRepository.GetAsync(c => c._id == taskId);
            if (task is null)
                throw new ValidationException("The task not found.");

            var column = await EnsureColumnExist(task.ColumnId);
            await CheckUserCanDelete(column.BoardId);

            await _taskRepository.DeleteAsync(taskId);
        }

        public async Task Update(UpdateTaskVM updateTask)
        {
            var task = await _taskRepository.GetAsync(c => c._id == updateTask.Id.ToString());
            if (task is null)
                throw new ValidationException("The task not found.");

            var column = await EnsureColumnExist(task.ColumnId);
            await CheckUserCanUpdate(column.BoardId);

            var newTask = _mapper.Map(updateTask, task);
            await _taskRepository.UpdateAsync(newTask);
        }

        public async Task<GetTaskDetail> GetTaskDetail(string taskId)
        {
            var task = await _taskRepository.GetAsync<GetTaskDetail>(c => c._id == taskId);
            if (task is null)
                throw new ValidationException("The task not found.");
            var column = await EnsureColumnExist(task.ColumnId);
            await CheckUserCanUpdate(column.BoardId);
            return task;
        }
    }

}