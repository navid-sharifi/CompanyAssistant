using App.Domain.Entities;

namespace App.Domain.Validation
{

    public abstract class BaseValidator<T> : IDomainValidator where T : BaseEntity
    {
        private List<(string field, List<string> Errors)> _errors = new();
        private T _model;

        protected BaseValidator(T model)
        {
            _model = model;
            if (string.IsNullOrEmpty(_model.Id))
                Add(nameof(model.Id), $"{nameof(model.Id)} can't be empty.");
        }

        protected void Add(string fieldName, string errorDescription)
        {
            var error = _errors.FirstOrDefault(c => c.field == fieldName);
            if (error.field is null)
                _errors.Add(fieldName, new List<string>({ errorDescription });

            else
                error.Errors.Add(errorDescription);
        }

        public List<(string field, List<string> Errors)> GetErrors() => _errors;
        public bool IsValid() => !_errors.Any();

    }


    public interface IDomainValidator
    {
        public List<(string field, List<string> Errors)> GetErrors();
        public bool IsValid();
    }
}


