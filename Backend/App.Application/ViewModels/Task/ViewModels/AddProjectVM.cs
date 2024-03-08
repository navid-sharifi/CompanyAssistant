using System.ComponentModel.DataAnnotations;
using App.Application.ViewModels.Comment.ViewModels;

namespace App.Application.ViewModels.Task.ViewModels
{

    public class AddTaskVM
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string ColumnId { get; set; }
    }

    public class UpdateTaskVM
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public Guid Id { get; set; }
    }

    public class GetTaskVM
    {
        public string Title { get; set; }
        public string ColumnId { get; set; }
        public string _id { get; set; }
    }
    
    public class GetTaskDetail
    {
        public string Title { get; set; }
        public string ColumnId { get; set; }
        public string _id { get; set; }
        public IList<GetCommentVM> Comments { get; internal set; }
    }
}
