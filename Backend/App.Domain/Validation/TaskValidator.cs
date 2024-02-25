using App.Utility.Extentions.String;

namespace App.Domain.Validation
{
    public class TaskValidator : BaseValidator<Entities.Task>
    {
        public TaskValidator(Entities.Task model) : base(model)
        {
            if (model.Title.IsNullOrEmpty())
                Add(nameof(model.Title), $"{nameof(model.Title)} can't be empty");

            if (!model.CreatorUserId.IsGuid())
                Add(nameof(model.CreatorUserId), $"Enter valid {nameof(model.CreatorUserId)}");
        }
    }
}