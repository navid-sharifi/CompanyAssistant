
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace App.Utility.Extentions
{
    public static class ServieExtentions
    {
        public static T GetService<T>(this IHttpContextAccessor httpContextAccessor) where T : class
        {
            return httpContextAccessor.HttpContext.RequestServices.GetRequiredService<T>();
        }
    }
}