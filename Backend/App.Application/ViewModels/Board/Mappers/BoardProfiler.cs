using App.Application.ViewModels.Board.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Board.Mappers
{
    public class BoardProfiler : Profile
    {
        public BoardProfiler()
        {
            CreateMap<Domain.Entities.Project, AddBoardVM>().ReverseMap();
            CreateMap<Domain.Entities.Project, GetBoardVM>().ReverseMap();
            CreateMap<Domain.Entities.Project, UpdateBoardVM>().ReverseMap();
        }
    }
}
