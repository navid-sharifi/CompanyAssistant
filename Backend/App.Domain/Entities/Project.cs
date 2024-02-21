namespace App.Domain.Entities
{

    public class Project : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string CompanyId { get; set; }
        public string CreatorUserId { get; set; }

    }
}
