using App.Domain.Entities;
using App.Utility.Extentions.String;

namespace App.Domain.Validation
{
    public class ColumnValidator : BaseValidator<Entities.Column>
    {
        public ColumnValidator(Column model) : base(model)
        {
            if (model.Name.IsNullOrEmpty())
                Add(nameof(model.Name), $"{nameof(model.Name)} can't be empty");

            if (!model.CreatorUserId.IsGuid())
                Add(nameof(model.CreatorUserId), $"Enter valid {nameof(model.CreatorUserId)}");

            if (!model.BoardId.IsGuid())
                Add(nameof(model.BoardId), $"Enter valid {nameof(model.BoardId)}");

        }
    }
}
