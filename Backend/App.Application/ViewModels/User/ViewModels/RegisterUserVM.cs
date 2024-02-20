using System.ComponentModel.DataAnnotations;

namespace App.Application.ViewModels.User.ViewModels
{
    public class RegisterUserVM : PasswordLoginVM
    {
        [Required]
        public string Name { get; set; }
    }


}
