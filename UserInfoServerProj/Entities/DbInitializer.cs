using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Entities
{
    public static class DbInitializer
    {
        public static async Task Initialize(RepositoryContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;   // DB has been seeded
            }

            context.Users.AddRange(GetUsers());
            context.SaveChanges();

            var projects = await GetProjects(context);
            context.Projects.AddRange(projects);
            context.SaveChanges();

            AssignUserIdsToProjects(context);
            context.SaveChanges();
        }

        private static User[] GetUsers()
        {
            return new User[] {
            new User {
                Name = "Nancy Drew",
                Email = "zigitEmployee1@zigit.com",
                Password = "ZigitIsTheBest1",
                Avatar = "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg",
                JoinedAt = DateTime.Now,
                Team = "Testers"
            },
            new User {
                Name = "John Doe",
                Email = "zigitEmployee2@zigit.com",
                Password = "ILoveZigit1",
                Avatar = "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg",
                JoinedAt = DateTime.Now,
                Team = "Testers"
            },
            };
        }

        private static async Task<List<Project>> GetProjects(DbContext context)
        {
            try
            {
                using HttpResponseMessage response = await sharedClient.GetAsync("info");
                response.EnsureSuccessStatusCode();
                var jsonResponse = await response.Content.ReadAsStringAsync();

                var projects = JsonConvert.DeserializeObject<List<Project>>(jsonResponse);

                return projects ?? new List<Project>();
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static void AssignUserIdsToProjects(RepositoryContext context)
        {
            var userIds = context.Users.Select(u => u.Id).ToList();
            var projects = context.Projects;
            var random = new Random();

            foreach (var project in projects)
            {
                int randomUserId = random.Next(userIds.Count());
                project.UserId = userIds[randomUserId];
            }

            context.SaveChanges();

        }

        private static HttpClient sharedClient = new()
        {
            BaseAddress = new Uri("https://private-052d6-testapi4528.apiary-mock.com"),
        };
    }
}