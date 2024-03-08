namespace App.Domain.Entities
{
    public class Comment : BaseEntity
    {
        public CommentType Type { get; set; }
        public string CreatorUserId { get; set; }
        public long LastEditTime { get; set; }
        public string Message { get; set; }
        public string TaskId { get; set; }
    }


    public enum CommentType
    {
        Message = 3,
        Event = 10
    }
}
