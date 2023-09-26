using Entities;
using System.Text.Json.Serialization;

namespace UserInfoServer.Models.Dto
{
    public class UserDto
    {
        public int Id { get; set; } 
        public string Token { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime JoinedAt { get; set; }
        public string Avatar { get; set; }

        public UserDto(User user)
        {
            Id = user.Id;
            Email = user.Email;
            Password = user.Password;
            Name = user.Name;
            Team = user.Team;
            JoinedAt = user.JoinedAt;
            Avatar = user.Avatar;
        }

        [JsonConstructor]
        public UserDto() { }
    }
}