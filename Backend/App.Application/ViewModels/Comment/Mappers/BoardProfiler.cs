using App.Application.ViewModels.Comment.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Comment.Mappers
{
    public class CommentProfiler : Profile
    {
        public CommentProfiler()
        {
            CreateMap<Domain.Entities.Comment, AddCommentVM>().ReverseMap();
            CreateMap<Domain.Entities.Comment, GetCommentVM>().ReverseMap();
            // CreateMap<Domain.Entities.Comment, GetTaskVM>().ReverseMap();
            // CreateMap<Domain.Entities.Comment, UpdateTaskVM>().ReverseMap();
            // CreateMap<Domain.Entities.Comment, GetTaskDetail>().ReverseMap();
        }
    }
}