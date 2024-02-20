using System.ComponentModel.DataAnnotations;

namespace App.Application.ViewModels.User.ViewModels
{
    public class PasswordLoginVM
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
