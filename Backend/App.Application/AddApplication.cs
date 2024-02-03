using Microsoft.Extensions.DependencyInjection;

namespace App.Application
{
    public static class AddApplicationExtention
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(typeof(AddApplicationExtention));

            return services;
        }

    }
}
