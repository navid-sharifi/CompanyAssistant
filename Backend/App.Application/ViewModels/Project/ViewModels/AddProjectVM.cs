using System.ComponentModel.DataAnnotations;

namespace App.Application.ViewModels.Project.ViewModels
{
    public class AddProjectVM
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public Guid CompanyId { get; set; }

    }

    public class UpdateProjectVM
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public Guid Id { get; set; }
    }
    public class GetProjectVM
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string _id { get; set; }
    }
}
