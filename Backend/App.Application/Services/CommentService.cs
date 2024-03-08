using System.ComponentModel.DataAnnotations;
using App.Application.IRepositories;
using App.Application.ViewModels.Comment.ViewModels;
using App.Utility.Extentions;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace App.Application.Services
{
    public class CommentService : BaseService<Domain.Entities.Comment>
    {
        private TaskService _taskService;
        private TaskService taskService
        {
            get
            {
                if (_taskService is null)
                    _taskService = _httpContextAccessor.GetService<TaskService>();

                return _taskService;

            }
        }

        private readonly UserService _userService;
        private readonly ICommentRepository commentRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public CommentService(UserService userService, ICommentRepository commentRepository, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _userService = userService;
            this.commentRepository = commentRepository;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
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

        public Task<IList<GetCommentVM>> GetTaskCommentsWithoutCheckAccess(string taskId)
        {
            return commentRepository.GetAllAsync<GetCommentVM>(c => c.TaskId == taskId);
        }

    }
}