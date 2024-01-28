using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {

        private readonly ILogger _logger;

        public HomeController(ILogger logger)
        {
            _logger = logger;
        }

    }
}
