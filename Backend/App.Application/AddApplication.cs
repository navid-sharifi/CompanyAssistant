﻿using App.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace App.Application
{
    public static class AddApplicationExtention
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(AddApplicationExtention).Assembly);
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(AddApplicationExtention).Assembly));
            services.AddScoped<UserService, UserService>();
            services.AddScoped<CompanyService, CompanyService>();
            services.AddScoped<ProjectService, ProjectService>();
            services.AddScoped<BoardService, BoardService>();
            services.AddScoped<ColumnService, ColumnService>();
            services.AddScoped<TaskService, TaskService>();
            services.AddScoped<CommentService, CommentService>();
            
            return services;
        }
    }
}