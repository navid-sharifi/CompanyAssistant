using App.Application.ViewModels.Column.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Column.Mappers
{
    public class ColumnProfiler : Profile
    {
        public ColumnProfiler()
        {
            CreateMap<Domain.Entities.Column, AddColumnVM>().ReverseMap();
            CreateMap<Domain.Entities.Column, GetColumnVM>().ReverseMap();
            CreateMap<Domain.Entities.Column, UpdateColumnVM>().ReverseMap();
        }
    }
}
