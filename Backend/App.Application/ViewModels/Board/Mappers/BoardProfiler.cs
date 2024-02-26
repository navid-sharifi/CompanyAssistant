using App.Application.ViewModels.Board.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Board.Mappers
{
    public class BoardProfiler : Profile
    {
        public BoardProfiler()
        {
            CreateMap<Domain.Entities.Board, AddBoardVM>().ReverseMap();
            CreateMap<Domain.Entities.Board, GetBoardVM>().ReverseMap();
            CreateMap<Domain.Entities.Board, UpdateBoardVM>().ReverseMap();
        }
    }
}
