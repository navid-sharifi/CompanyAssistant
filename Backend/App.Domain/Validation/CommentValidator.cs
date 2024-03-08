using App.Domain.Entities;
using App.Utility.Extentions.String;

namespace App.Domain.Validation
{
    public class CommentValidator : BaseValidator<Entities.Comment>
    {
        public CommentValidator(Comment model) : base(model)
        {

            if (!model.CreatorUserId.IsGuid())
                Add(nameof(model.CreatorUserId), $"Enter valid {nameof(model.CreatorUserId)}");

            if (!model.TaskId.IsGuid())
                Add(nameof(model.TaskId), $"Enter valid {nameof(model.TaskId)}");

        
            if (model.Message.IsNullOrEmpty())
                Add(nameof(model.Message), $"{nameof(model.Message)} can't be empty");


        }
    }
}
