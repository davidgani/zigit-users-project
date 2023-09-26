using Entities;

public class ProjectDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public int BugsCount { get; set; }
        public int DurationInDays { get; set; }
        public bool MadeDeadLine { get; set; }
        public int UserId { get; set; }

        public ProjectDto(Project project)
        {
            Id = project.Id; 
            Name = project.Name; 
            Score = project.Score; 
            BugsCount = project.BugsCount; 
            DurationInDays = project.DurationInDays;
            MadeDeadLine = project.MadeDeadLine;
            UserId = project.UserId;
        }
    }