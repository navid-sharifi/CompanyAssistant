namespace App.Domain.Validation
{
    public class EntityNotValidException : System.Exception
    {
        public string Message { get; set; }
        public object AdditionalData { get; set; }

        public EntityNotValidException(string message, object additionalData)
        {
            Message = message;
            AdditionalData = additionalData;
        }

    }
}
