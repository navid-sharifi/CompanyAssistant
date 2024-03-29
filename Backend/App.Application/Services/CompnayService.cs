﻿using App.Application.IRepositories;
using App.Application.ViewModels.Company.ViewModels;
using App.Domain.Entities;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{
    public class CompanyService : BaseService<Company>
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly ICompanyRepository _companyRepository;
        public CompanyService(IMapper mapper, UserService userService, ICompanyRepository companyRepository)
        {
            _mapper = mapper;
            _userService = userService;
            _companyRepository = companyRepository;
        }

        public async Task Add(AddCompanyVM AddCompany)
        {
            var company = _mapper.Map<Company>(AddCompany);

            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            company.CreatorUserId = user._id;
            await _companyRepository.CreateAsync(company);
        }

        public async Task<IList<GetCompanyVM>> GetAll()
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            return await _companyRepository.GetAllAsync<GetCompanyVM>(c => c.CreatorUserId == user._id);
        }
        public async Task<GetCompanyVM> GetCurrentUserCompany(string CompanyId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            return await _companyRepository.GetAsync<GetCompanyVM>(c => c._id == CompanyId && c.CreatorUserId == user._id);
        }

        public async Task Delete(string CompanyId)
        {
            var company = await GetCurrentUserCompany(CompanyId);
            if (company is null)
                throw new ValidationException("Compnay not found");

            await _companyRepository.DeleteAsync(company._id);
        }

        public async Task Update(UpdateCompanyVM updateCompany)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var company = await _companyRepository.GetAsync(c => c._id == updateCompany.Id.ToString() && c.CreatorUserId == user._id);
            if (company is null)
                throw new ValidationException("Compnay not found");
            var newCompany = _mapper.Map(updateCompany, company);
            await _companyRepository.UpdateAsync(newCompany);
        }
    }

}