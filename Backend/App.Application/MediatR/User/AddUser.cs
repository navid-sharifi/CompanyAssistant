using MediatR;

namespace App.Application.MediatR.User
{
    public class AddUserRequest : IRequest
    {

    }

    public class AddUserHandler : IRequestHandler<AddUserRequest>
    {
        public Task Handle(AddUserRequest request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

}
