using App.Application.ViewModels.Column.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Column.Mappers
{
    public class ColumnProfiler : Profile
    {
        public ColumnProfiler()
        {
            CreateMap<Domain.Entities.Project, AddColumnVM>().ReverseMap();
            CreateMap<Domain.Entities.Project, GetColumnVM>().ReverseMap();
            CreateMap<Domain.Entities.Project, UpdateColumnVM>().ReverseMap();
        }
    }
}
