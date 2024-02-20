using App.Application;
using App.Persistence.Database.MongoDb;
using App.Utility.Extentions.String;
using Application.Presentation.Middlewares;
using Microsoft.IdentityModel.Tokens;

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

            builder.Services.AddHttpContextAccessor();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy(name: MyAllowSpecificOrigins,
            //                      builder =>
            //                      {
            //                          builder.WithOrigins("http://example.com",
            //                                              "http://www.contoso.com");
            //                      });
            //});

            //builder.Services.AddAuthentication("Bearer").AddJwtBearer();

            var dfdfd = configuration.GetValue<string>("Authentication:Secret");

            builder.Services.AddAuthentication("Bearer").AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "https://localhost:5001",
                    ValidAudience = "https://localhost:5001",
                    IssuerSigningKey = new SymmetricSecurityKey(configuration.GetValue<string>("Authentication:Secret").ToBytes())
                };
            });

            builder.Services.AddMongoDb(configuration);
            builder.Services.AddApplication(configuration);
            builder.Services.AddControllers();

            var app = builder.Build();
            // Configure the HTTP request pipeline.
            app.UseCustomExceptionHandler();
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.Run();
        }
    }
}