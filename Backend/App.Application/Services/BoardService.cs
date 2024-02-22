﻿using App.Application.IRepositories;
using App.Application.ViewModels.Board.ViewModels;
using App.Application.ViewModels.Column.ViewModels;
using App.Application.ViewModels.Project.ViewModels;
using App.Domain.Entities;
using AutoMapper;
using System.ComponentModel.DataAnnotations;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{
    public class BoardService : BaseService<Board>
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly IProjectRepository _projectRepository;
        private readonly IBoardRepository _boardRepository;

        private readonly ProjectService _projectService;
        public BoardService(IMapper mapper, UserService userService, IProjectRepository projectRepository, ProjectService projectService, IBoardRepository boardRepository)
        {
            _mapper = mapper;
            _userService = userService;
            _projectRepository = projectRepository;

            _projectService = projectService;
            _boardRepository = boardRepository;
        }


        public async Task Add(AddBoardVM addBoard)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var project = await _projectService.GetCurrentUserProject(addBoard.ProjectId.ToString());
            if (project is null)
                throw new ValidationException("project not found");

            var board = _mapper.Map<Board>(addBoard);
            board.CreatorUserId = user._id;

            await _boardRepository.CreateAsync(board);
        }

        public async Task<IList<GetBoardVM>> GetAll(string projectId)
        {
            var project = await _projectService.GetCurrentUserProject(projectId);
            if (project is null)
                throw new ValidationException("project not found");

            return await _boardRepository.GetAllAsync<GetBoardVM>(c => c.ProjectId == projectId);
        }

        public async Task<GetProjectVM> GetCurrentUserBoard(string boardId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            return await _projectRepository.GetAsync<GetProjectVM>(c => c._id == boardId && c.CreatorUserId == user._id);
        }

        public async Task Delete(string boardId)
        {
            var board = await GetCurrentUserBoard(boardId);
            if (board is null)
                throw new ValidationException("board not found");

            await _boardRepository.DeleteAsync(board._id);
        }

        public async Task Update(UpdateBoardVM updateBoard)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var board = await _boardRepository.GetAsync(c => c._id == updateBoard.Id.ToString() && c.CreatorUserId == user._id);
            if (board is null)
                throw new ValidationException("board not found");

            var newBoard = _mapper.Map(updateBoard, board);
            await _boardRepository.UpdateAsync(newBoard);
        }



        internal async Task<bool> UserCanAdd(string boardId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var board = await _boardRepository.GetAsync(boardId);
            if (board?.CreatorUserId == boardId)
                return true;
            return false;
        }
    }

    public class ColumnService : BaseService<Board>
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        private readonly BoardService _boardService;
        private readonly IProjectRepository _projectRepository;
        private readonly IBoardRepository _boardRepository;
        private readonly IColumnRepository _columnRepository;

        private readonly ProjectService _projectService;
        public ColumnService(IMapper mapper, UserService userService, IProjectRepository projectRepository, ProjectService projectService, IBoardRepository boardRepository, IColumnRepository columnRepository, BoardService boardService)
        {
            _mapper = mapper;
            _userService = userService;
            _projectRepository = projectRepository;

            _projectService = projectService;
            _boardRepository = boardRepository;
            _columnRepository = columnRepository;
            _boardService = boardService;
        }




        private Task<bool> UserCanAdd(string boardId)
        {
            return _boardService.UserCanAdd(boardId);
        }

        public async Task Add(AddColumnVM addColumn)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");
            var userCanAdd = await UserCanAdd(addColumn.BoardId.ToString());

            if (!userCanAdd)
                throw new ValidationException("You don't have access to this board");

            var column = _mapper.Map<Column>(addColumn);
            column.CreatorUserId = user._id;

            var maxOrder = (await _columnRepository.Max(c => c.Order))?.Order ?? 0;
            column.Order = ++maxOrder;

            await _columnRepository.CreateAsync(column);
        }

        public async Task<IList<GetBoardVM>> GetAll(string projectId)
        {
            var project = await _projectService.GetCurrentUserProject(projectId);
            if (project is null)
                throw new ValidationException("project not found");

            return await _boardRepository.GetAllAsync<GetBoardVM>(c => c.ProjectId == projectId);
        }

        public async Task<GetProjectVM> GetCurrentUserBoard(string boardId)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            return await _projectRepository.GetAsync<GetProjectVM>(c => c._id == boardId && c.CreatorUserId == user._id);
        }

        public async Task Delete(string boardId)
        {
            var board = await GetCurrentUserBoard(boardId);
            if (board is null)
                throw new ValidationException("board not found");

            await _boardRepository.DeleteAsync(board._id);
        }

        public async Task Update(UpdateBoardVM updateBoard)
        {
            var user = await _userService.CurrentUser();
            if (user is null)
                throw new ValidationException("Not found current user.");

            var board = await _boardRepository.GetAsync(c => c._id == updateBoard.Id.ToString() && c.CreatorUserId == user._id);
            if (board is null)
                throw new ValidationException("board not found");

            var newBoard = _mapper.Map(updateBoard, board);
            await _boardRepository.UpdateAsync(newBoard);
        }
    }

}