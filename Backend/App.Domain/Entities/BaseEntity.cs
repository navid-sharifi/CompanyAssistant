namespace App.Domain.Entities
{
    public abstract class BaseEntity
    {
        public string Id { get; set; }

        public long CreationTime { get; set; }

    }
}
