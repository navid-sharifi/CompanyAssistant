using App.Application.ViewModels.Task.ViewModels;
using System.ComponentModel.DataAnnotations;

namespace App.Application.ViewModels.Column.ViewModels
{

    public class AddColumnVM
    {

        [Required]
        public string Name { get; set; }
        [Required]
        public string BoardId { get; set; }

    }

    public class UpdateColumnVM
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Order { get; set; }
        [Required]
        public Guid Id { get; set; }
    }

    public class GetColumnVM
    {
        public string Name { get; set; }
        public string Order { get; set; }
        public string BoardId { get; set; }
        public string _id { get; set; }
        public IList<GetTaskVM> Tasks { get; set; }

    }
}
