namespace App.Domain.Entities
{
    public class Column : BaseEntity
    {
        public string Name { get; set; }
        public int Order { get; set; }
        public string BoardId { get; set; }
    }
}
