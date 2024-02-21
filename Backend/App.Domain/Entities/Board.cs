namespace App.Domain.Entities
{
    public class Board : BaseEntity
    {
        public string Name { get; set; }
        public string CreatorUserId { get; set; }
        public string ProjectId { get; set; }
    }
}
