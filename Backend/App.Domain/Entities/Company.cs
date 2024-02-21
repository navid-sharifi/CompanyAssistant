namespace App.Domain.Entities
{
    public class Company : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string CreatorUserId { get; set; }

    }
}

