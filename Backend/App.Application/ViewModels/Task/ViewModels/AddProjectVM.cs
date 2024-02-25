using System.ComponentModel.DataAnnotations;

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
    }

    public class GetTaskVM
    {
        public string Title { get; set; }
        public string ColumnId { get; set; }
    }
}
