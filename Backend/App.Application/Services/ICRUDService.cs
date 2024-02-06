namespace App.Application.Services
{
    public interface ICRUDService<TAddDto, TGet>
    {
        public Task Add(TAddDto data);

        public Task Delete(string id);

        public Task<TGet> Get(string id);

        public Task<IList<TGet>> GetAll();
    }
}