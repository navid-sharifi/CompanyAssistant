using App.Application.IRepositories;
using App.Application.ViewModels.Project.ViewModels;
using App.Domain.Entities;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{
    public class ProjectService : BaseService<Project>
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly IProjectRepository _projectRepository;
        private readonly CompanyService _companyService;
        public ProjectService(IMapper mapper, UserService userService, IProjectRepository projectRepository, CompanyService companyService)
        {
            _mapper = mapper;
            _userService = userService;
            _projectRepository = projectRepository;
            _companyService = companyService;
        }


        public async Task Add(AddProjectVM addProject)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var company = await _companyService.GetCurrentUserCompany(addProject.CompanyId.ToString());
            if (company is null)
                throw new ValidationException("Compnay not found");

            var project = _mapper.Map<Project>(addProject);
            project.CreatorUserId = user._id;

            await _projectRepository.CreateAsync(project);
        }

        public async Task<IList<GetProjectVM>> GetAll(string companyId)
        {
            var company = await _companyService.GetCurrentUserCompany(companyId.ToString());
            if (company is null)
                throw new ValidationException("Compnay not found");

            return await _projectRepository.GetAllAsync<GetProjectVM>(c => c.CompanyId == companyId);
        }

        public async Task<GetProjectVM> Get(string projectId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            return await _projectRepository.GetAsync<GetProjectVM>(c => c._id == projectId && c.CreatorUserId == user._id);
        }

        public async Task Delete(string projectId)
        {
            var project = await Get(projectId);
            if (project is null)
                throw new ValidationException("Project not found");

            await _projectRepository.DeleteAsync(project._id);
        }

        public async Task Update(UpdateProjectVM updateProject)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var project = await _projectRepository.GetAsync(c => c._id == updateProject.Id.ToString() && c.CreatorUserId == user._id);
            if (project is null)
                throw new ValidationException("Project not found");

            var newProject = _mapper.Map(updateProject, project);
            await _projectRepository.UpdateAsync(newProject);
        }
    }

}