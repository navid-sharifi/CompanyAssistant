using App.Application.IRepositories;
using MediatR;

namespace App.Application.MediatR.User
{
    public class DeleteUserRequest : IRequest
    {
        public string Id { get; set; }
    }
    public class DeleteUserHandler : IRequestHandler<DeleteUserRequest>
    {
        public DeleteUserHandler(IUserRepository repository)
        {
            _repo = repository;
        }

        private readonly IUserRepository _repo;
        public Task Handle(DeleteUserRequest request, CancellationToken cancellationToken)
        {
            return _repo.DeleteAsync(request.Id);
        }
    }
}
