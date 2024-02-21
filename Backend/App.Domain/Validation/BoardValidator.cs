using App.Utility.Extentions.String;

namespace App.Domain.Validation
{
    public class BoardValidator : BaseValidator<Entities.Board>
    {
        public BoardValidator(Entities.Board model) : base(model)
        {
            if (model.Name.IsNullOrEmpty())
                Add(nameof(model.Name), $"{nameof(model.Name)} can't be empty");

            if (!model.CreatorUserId.IsGuid())
                Add(nameof(model.Name), $"Enter valid {nameof(model.Name)}");

            if (!model.ProjectId.IsGuid())
                Add(nameof(model.Name), $"Enter valid {nameof(model.Name)}");

        }
    }
}
