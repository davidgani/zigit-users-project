namespace Entities
{
    public class Project
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public int BugsCount { get; set; }
        public int DurationInDays { get; set; }
        public bool MadeDeadLine { get; set; }
        public int UserId { get; set; }

    }
}
