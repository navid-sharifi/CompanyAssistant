using App.Domain.Entities;
using App.Utility.Extentions.String;

namespace App.Domain.Validation
{
    public class UserValidator : BaseValidator<Entities.User>
    {
        public UserValidator(User model) : base(model)
        {
            if (model.Name.IsNullOrEmpty())
                Add(nameof(model.Name), $"{nameof(model.Name)} can't be empty");

        }
    }
}
