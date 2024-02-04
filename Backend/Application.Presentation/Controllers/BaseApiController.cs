using Application.Presentation.Filter;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiResultFilter]
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {

    }
}
