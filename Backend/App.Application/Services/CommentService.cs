using System.ComponentModel.DataAnnotations;
using App.Application.IRepositories;
using App.Application.ViewModels.Comment.ViewModels;
using AutoMapper;

namespace App.Application.Services
{
    public class CommentService : BaseService<Domain.Entities.Comment>
    {
        private readonly TaskService taskService;
        private readonly UserService _userService;
        private readonly ICommentRepository commentRepository;
        private readonly IMapper _mapper;

        public CommentService(TaskService taskService, UserService userService, ICommentRepository commentRepository, IMapper mapper)
        {
            this.taskService = taskService;
            _userService = userService;
            this.commentRepository = commentRepository;
            _mapper = mapper;
        }

        public async Task CheckUserCanAdd(AddCommentVM comment)
        {
            await taskService.CheckUserCanAddWithTaskId(comment.TaskId.ToString());


        }

        public async Task AddComment(AddCommentVM comment)
        {
            await CheckUserCanAdd(comment);

            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var entity = _mapper.Map<Domain.Entities.Comment>(comment);
            entity.CreatorUserId = user._id;
            entity.LastEditTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            await commentRepository.CreateAsync(entity);
        }
    }
}