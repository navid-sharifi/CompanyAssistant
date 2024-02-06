namespace App.Application.Services
{
    public interface ICRUDService<TAddDto, TGet>
    {
        public Task Add(TAddDto data);

        public Task Delete(string id);

        public TGet Get(string id);

        public IList<TGet> GetAll(string id);
    }
}