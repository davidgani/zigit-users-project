using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserInfoServer.Config;
using UserInfoServer.Models.Dto;

namespace UserInfoServer.Authentication
{
    public class JWTAuthenticationService
    {
        private readonly JwtConfig _config;

        public JWTAuthenticationService(IOptions<JwtConfig> config)
        {
            _config = config.Value;
        }

        public string GenerateToken(UserDto user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Email),
            };
            var token = new JwtSecurityToken(_config.Issuer,
                _config.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        public bool ValidateCurrentToken(string token)
        {

            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config.Key));

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = _config.Issuer,
                    ValidAudience = _config.Audience,
                    IssuerSigningKey = securityKey
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}