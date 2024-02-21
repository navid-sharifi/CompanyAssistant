using App.Application.Services;
using App.Application.ViewModels.Project.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers.User
{
    [Authorize(Roles = "user")]
    public class ProjectController : BaseApiController
    {
        private readonly ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        public Task Create([FromBody] AddProjectVM AddProject)
        {
            return _projectService.Add(AddProject);
        }

        [HttpPut]
        public Task Update([FromBody] UpdateProjectVM updateProject)
        {
            return _projectService.Update(updateProject);
        }


        [HttpGet]
        [Route("{companyId}")]
        public Task<IList<GetProjectVM>> GetAll(Guid companyId)
        {
            return _projectService.GetAll(companyId.ToString());
        }

        [HttpDelete]
        [Route("{id}")]
        public Task Delete(Guid id)
        {
            return _projectService.Delete(id.ToString());
        }

    }

}