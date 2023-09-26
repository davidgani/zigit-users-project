using System.Text.Json.Serialization;

namespace UserInfoServer.Models.Dto
{
    public class LoginDetailsDto
    {
        public string userName { get; set; }
        public string Password { get; set; }


        [JsonConstructor]
        public LoginDetailsDto() { }
    }
}
