using App.Domain.Entities;
using App.Utility.Extentions.String;

namespace App.Domain.Validation
{

    public abstract class BaseValidator<T> : IDomainValidator where T : BaseEntity
    {
        private List<DomainValidatorMessage> _errors = new();
        private T _model;

        protected BaseValidator(T model)
        {
            _model = model;

            if (_model._id.IsNullOrEmpty())
                Add(nameof(model._id), $"{nameof(model._id)} can't be empty.");
        }

        protected void Add(string fieldName, string errorDescription)
        {
            var error = _errors.FirstOrDefault(c => c.field == fieldName);
            if (error is null)
                _errors.Add(new DomainValidatorMessage { field = fieldName, Errors = new List<string> { errorDescription } });
            else
                error.Errors.Add(errorDescription);
        }

        public List<DomainValidatorMessage> GetErrors() => _errors;
        public bool IsValid() => !_errors.Any();

    }


    public interface IDomainValidator
    {
        public List<DomainValidatorMessage> GetErrors();
        public bool IsValid();
    }

    public class DomainValidatorMessage
    {
        public string field { get; set; }
        public List<string> Errors { get; set; }
    }
}