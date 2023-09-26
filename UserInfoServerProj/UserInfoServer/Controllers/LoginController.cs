using Contracts.Repositories;
using Microsoft.AspNetCore.Mvc;
using UserInfoServer.Authentication;
using UserInfoServer.Models.Dto;

namespace UserInfoServer.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private JWTAuthenticationService _jwtAuthenticationService;
        private IRepositoryWrapper _repository;


        public LoginController(IRepositoryWrapper repository, JWTAuthenticationService jWTAuthenticationService)
        {
            _repository = repository;
            _jwtAuthenticationService = jWTAuthenticationService;
        }

        [HttpPost]
        public ActionResult LoginUser(LoginDetailsDto loginDetailsDto)
        {
            try
            {
                var user = Authenticate(loginDetailsDto);

                if (user != null)
                {
                    user.Token = _jwtAuthenticationService.GenerateToken(user);

                    return Ok(user);
                }
            }
            catch(Exception) { }
            {
                return NotFound("User not found");
            }

        }

        private UserDto? Authenticate(LoginDetailsDto loginDetails)
        {
            var authorizedUsers = _repository.User.FindAll().ToList();
            var currentUser = authorizedUsers.FirstOrDefault(x => x.Email.ToLower() ==
                loginDetails.userName.ToLower() && x.Password == loginDetails.Password);

            if (currentUser != null)
            {
                return new UserDto(currentUser);
            }

            return null;
        }
    }
}