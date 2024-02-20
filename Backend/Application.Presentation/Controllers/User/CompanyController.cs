using App.Application.Services;
using App.Application.ViewModels.Company.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers.User
{
    [Authorize(Roles = "user")]
    public class CompanyController : BaseApiController
    {
        private readonly CompanyService _companyService;

        public CompanyController(CompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpPost]
        public Task Create([FromBody] AddCompanyVM AddCompany)
        {
            return _companyService.Add(AddCompany);
        }

        [HttpGet]
        public Task<IList<GetCompanyVM>> GetAll()
        {
            return _companyService.GetAll();
        }

        [HttpDelete]
        [Route("{id}")]
        public Task Delete(Guid id)
        {
            return _companyService.Delete(id.ToString());
        }

    }
}