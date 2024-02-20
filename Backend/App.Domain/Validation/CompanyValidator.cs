using App.Domain.Entities;
using App.Utility.Extentions.String;

namespace App.Domain.Validation
{
    public class CompanyValidator : BaseValidator<Entities.Company>
    {
        public CompanyValidator(Company model) : base(model)
        {
            if (model.Name.IsNullOrEmpty())
                Add(nameof(model.Name), $"{nameof(model.Name)} can't be empty");

            if (!model.CreatorUserId.IsGuid())
                Add(nameof(model.Name), $"Enter valid {nameof(model.Name)}");

        }
    }
}
