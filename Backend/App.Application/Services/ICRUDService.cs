namespace App.Application.Services
{
    public interface ICRUDService<TAddDto>
    {
        public Task Add(TAddDto add);

        public Task Delete(string id);

        public Task Get(string id);

    }
}
