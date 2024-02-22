﻿using App.Application.Config.Models;
using App.Application.IRepositories;
using App.Persistence.Database.MongoDb.ConfigModel;
using App.Persistence.Repositoriess;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace App.Persistence.Database.MongoDb
{
    public static class Mongo
    {
        public static IServiceCollection AddMongoDb(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IMongoDatabase>(options =>
            {

                var mongoSettings = configuration.GetSection("MongoDBSettings").Get<MongoDBSettings>();
                var serviceSettings = configuration.GetSection("ServiceSettings").Get<ServiceSettings>();

                if (mongoSettings is null || serviceSettings is null)
                    throw new Exception(
                        $"{nameof(MongoDBSettings)}, {nameof(ServiceSettings)}  Configs can't be empty.");

                var client = new MongoClient(mongoSettings.ConnectionString);
                return client.GetDatabase(serviceSettings.ServiceName);
            });

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IBoardRepository, BoardRepository>();
            services.AddScoped<IColumnRepository, ColumnRepository>();
            return services;
        }
    }
}
