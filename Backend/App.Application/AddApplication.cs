using App.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace App.Application
{
    public static class AddApplicationExtention
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(AddApplicationExtention));
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(AddApplicationExtention).Assembly));

            services.AddScoped<UserService, UserService>();
            return services;
        }
    }
}