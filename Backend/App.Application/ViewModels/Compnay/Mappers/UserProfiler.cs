using App.Application.ViewModels.Company.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.Company.Mappers
{
    public class CompanyProfiler : Profile
    {
        public CompanyProfiler()
        {
            CreateMap<Domain.Entities.Company, AddCompanyVM>().ReverseMap();
            CreateMap<Domain.Entities.Company, GetCompanyVM>().ReverseMap();
        }
    }
}
