using App.Application;
using App.Persistence.Database.MongoDb;


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

            builder.Services.AddMongoDb(configuration);
            builder.Services.AddApplication(configuration);
            builder.Services.AddControllers();

            var app = builder.Build();
            // Configure the HTTP request pipeline.
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}