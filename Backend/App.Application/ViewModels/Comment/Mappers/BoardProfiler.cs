using App.Application.ViewModels.Task.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Comment.Mappers
{
    public class CommentProfiler : Profile
    {
        public CommentProfiler()
        {
            CreateMap<Domain.Entities.Comment, AddTaskVM>().ReverseMap();
            // CreateMap<Domain.Entities.Comment, GetTaskVM>().ReverseMap();
            // CreateMap<Domain.Entities.Comment, UpdateTaskVM>().ReverseMap();
            // CreateMap<Domain.Entities.Comment, GetTaskDetail>().ReverseMap();
        }
    }
}