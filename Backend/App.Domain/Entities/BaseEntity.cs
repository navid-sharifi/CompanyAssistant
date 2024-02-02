namespace App.Domain.Entities
{
    public abstract class BaseEntity
    {
        public string _id { get; set; }

        public long CreationTime { get; set; }

    }
}
