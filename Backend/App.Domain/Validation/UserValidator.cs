using App.Domain.Entities;

namespace App.Domain.Validation
{
    public class UserValidator : BaseValidator<Entities.User>
    {
        public UserValidator(User model) : base(model)
        {
            if (model.Name.isnull)
            {

            }
        }

    }
}
