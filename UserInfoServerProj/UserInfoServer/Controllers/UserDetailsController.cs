using Contracts.Repositories;
using Microsoft.AspNetCore.Mvc;
using UserInfoServer.Authentication;

namespace UserInfoServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserDetailsController : ControllerBase
    {
        private readonly ILogger<UserDetailsController> _logger;
        private IRepositoryWrapper _repository;
        private JWTAuthenticationService _jwtAutheticationService;

        public UserDetailsController(ILogger<UserDetailsController> logger,
                                     IRepositoryWrapper repositoryWrapper,
                                     JWTAuthenticationService jwtAuthentication)
        {
            _logger = logger;
            _repository = repositoryWrapper;
            _jwtAutheticationService = jwtAuthentication;   
        }

        [HttpPost]
        public ActionResult GetProjectsByUserId()
        {
            try
            {
                var token = Request.Headers["Authorization"];
                var userId = int.Parse(Request.Headers["params"]);

                if (!_jwtAutheticationService.ValidateCurrentToken(token))
                {
                    throw new Exception("Unauthorized user");
                }

                var userProjects = _repository.Project.FindByCondition(p => p.UserId == userId).
                                                    ToList().ConvertAll(p => new ProjectDto(p));

                return Ok(userProjects);
            }
            catch (Exception e)
            {
                return Unauthorized(e);
            }
        }
    }
}