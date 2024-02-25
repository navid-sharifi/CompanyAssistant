using App.Application.ViewModels.Task.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Task.Mappers
{
    public class TaskProfiler : Profile
    {
        public TaskProfiler()
        {
            CreateMap<Domain.Entities.Task, AddTaskVM>().ReverseMap();
            CreateMap<Domain.Entities.Task, GetTaskVM>().ReverseMap();
            CreateMap<Domain.Entities.Task, UpdateTaskVM>().ReverseMap();
        }
    }
}
