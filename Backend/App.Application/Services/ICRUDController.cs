namespace App.Application.Services
{
    public interface ICRUDService<TAddDto>
    {
        public Task Add(TAddDto add);

    }
}
