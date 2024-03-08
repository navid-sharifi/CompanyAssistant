using App.Application.Services;
using App.Application.ViewModels.Task.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers.User
{
    [Authorize(Roles = "user")]
    public class TaskController : BaseApiController
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("GetTaskDetail/{id}")]
        public Task<GetTaskDetail> GetTaskDetail(Guid id)
        {
            return _taskService.GetTaskDetail(id.ToString());
        }

        [HttpPost]
        public Task AddComment([FromBody] AddTaskVM addTask)
        {
            return _taskService.Add(addTask);
        }

        [HttpPost]
        public Task Create([FromBody] AddTaskVM addTask)
        {
            return _taskService.Add(addTask);
        }

        [HttpPut]
        public Task Update([FromBody] UpdateTaskVM updateTask)
        {
            return _taskService.Update(updateTask);
        }

        [HttpGet]
        [Route("{columnId}")]
        public Task<IList<GetTaskVM>> GetAll(Guid columnId)
        {
            return _taskService.GetAll(columnId.ToString());
        }

        [HttpDelete]
        [Route("{id}")]
        public Task Delete(Guid id)
        {
            return _taskService.Delete(id.ToString());
        }

    }

}