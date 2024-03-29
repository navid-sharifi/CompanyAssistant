﻿using App.Application.MediatR.User;
using App.Application.ViewModels.User.ViewModels;
using AutoMapper;

namespace App.Application.ViewModels.User.Mappers
{
    public class UserProfiler : Profile
    {
        public UserProfiler()
        {
            CreateMap<Domain.Entities.User, AddUserRequest>().ReverseMap();
            CreateMap<Domain.Entities.User, GetUserDto>().ReverseMap();
            CreateMap<AddUserRequest, AddNewUserDto>().ReverseMap();
        }
    }
}
