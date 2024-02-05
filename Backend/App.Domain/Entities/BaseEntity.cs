using App.Utility.Extentions.String;

namespace App.Domain.Entities
{
    public abstract class BaseEntity
    {
        public BaseEntity()
        {
            if (_id.IsNullOrEmpty())
                _id = Guid.NewGuid().ToString();

            if (CreationTime == 0)
                CreationTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

        }
        public string _id { get; set; }

        public long CreationTime { get; set; }

    }
}
