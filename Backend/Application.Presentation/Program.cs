using App.Application;
using App.Persistence.Database.MongoDb;
using Application.Presentation.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Application.Presentation
{
    public class Program
    {
        private static ConfigurationManager configuration;

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            configuration = builder.Configuration;
            // Add services to the container.

            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "https://localhost:5001",
                    ValidAudience = "https://localhost:5001",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
                };
            });

            builder.Services.AddMongoDb(configuration);
            builder.Services.AddApplication(configuration);
            builder.Services.AddControllers();

            var app = builder.Build();
            // Configure the HTTP request pipeline.
            app.UseCustomExceptionHandler();
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseAuthentication();
            app.MapControllers();
            app.Run();
        }
    }
}