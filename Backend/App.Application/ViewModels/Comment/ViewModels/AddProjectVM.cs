using System.ComponentModel.DataAnnotations;

namespace App.Application.ViewModels.Comment.ViewModels
{

    public class AddCommentVM
    {
        [Required]
        public string Message { get; set; }

        [Required]
        public Guid TaskId { get; set; }
    }

    public class GetCommentVM
    {
       
        public string Message { get; set; }
        public Guid TaskId { get; set; }

    }

    // public class UpdateTaskVM
    // {
    //     [Required]
    //     public string Title { get; set; }
    //     [Required]
    //     public Guid Id { get; set; }
    // }

    // public class GetTaskVM
    // {
    //     public string Title { get; set; }
    //     public string ColumnId { get; set; }
    //     public string _id { get; set; }
    // }

    // public class GetTaskDetail
    // {
    //     public string Title { get; set; }
    //     public string ColumnId { get; set; }
    //     public string _id { get; set; }
    // }
}
