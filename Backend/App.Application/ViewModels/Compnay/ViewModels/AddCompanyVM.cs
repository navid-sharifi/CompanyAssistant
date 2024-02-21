using System.ComponentModel.DataAnnotations;

namespace App.Application.ViewModels.Company.ViewModels
{
    public class AddCompanyVM
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

    }

    public class UpdateCompanyVM : AddCompanyVM
    {
        [Required]
        public Guid Id { get; set; }
    }

}
