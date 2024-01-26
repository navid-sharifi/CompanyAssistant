namespace App.Domain.Entities
{

    public class Task : BaseEntity
    {
        public string Title { get; set; }
        public string ColumnId { get; set; }
    }
}
