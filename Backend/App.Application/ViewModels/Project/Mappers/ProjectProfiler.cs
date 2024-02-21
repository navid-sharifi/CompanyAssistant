using App.Application.ViewModels.Project.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Project.Mappers
{
    public class ProjectProfiler : Profile
    {
        public ProjectProfiler()
        {
            CreateMap<Domain.Entities.Project, AddProjectVM>().ReverseMap();
            CreateMap<Domain.Entities.Project, GetProjectVM>().ReverseMap();
            CreateMap<Domain.Entities.Project, UpdateProjectVM>().ReverseMap();
        }
    }
}
