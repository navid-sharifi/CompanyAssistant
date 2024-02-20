using App.Application.IRepositories;
using App.Application.MediatR.User;
using App.Application.ViewModels.User.ViewModels;
using App.Domain.Entities;
using App.Utility.Exceptions;
using App.Utility.Extentions.String;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Task = System.Threading.Tasks.Task;

namespace App.Application.Services
{
    public class UserService : BaseService<User>, ICRUDService<AddNewUserDto, GetUserDto>
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IMediator mediator, IMapper mapper, IUserRepository userRepository, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _mediator = mediator;
            _mapper = mapper;
            _userRepository = userRepository;
            this.configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task Add(AddNewUserDto user)
        {
            return _mediator.Send(_mapper.Map<AddUserRequest>(user));
        }

        public async Task Register(RegisterUserVM registerUser)
        {

            var user = await _userRepository.GetAsync(c => c.Email == registerUser.Email);
            if (user is not null)
                throw new ValidationException("This email used already.");

            await _userRepository.CreateAsync(new User
            {
                Email = registerUser.Email,
                Password = HashPassword(registerUser.Password),
                Name = registerUser.Name,
                Roles = "user"
            });

        }


        public Task Delete(string id)
        {
            return _mediator.Send(new DeleteUserRequest { Id = id });
        }

        public Task<GetUserDto> Get(string id)
        {
            return _mediator.Send(new GetUserRequest { Id = id });
        }
        public Task<IList<GetUserDto>> GetAll()
        {
            return _mediator.Send(new GetAllUserRequest());
        }

        public async Task<string> PasswordLogin(PasswordLoginVM PasswordLoginuser)
        {
            var user = await _userRepository.GetAsync(c => c.Email == PasswordLoginuser.Email);
            if (user is null)
                throw new ValidationException("Email or Password is wrong.");
            var hashedPssword = HashPassword(PasswordLoginuser.Password);
            if (hashedPssword != user.Password)
                throw new ValidationException("Email or Password is wrong.");

            return GeneratToken(user._id);
        }

        private string HashPassword(string password)
        {
            var newPassword = $"2SNGq7(@Akqvj*XK{password}NpSG8P(nF)uI32jq";
            int iterations = 10000;
            int numBytesRequested = 100;

            // Hash the password
            byte[] hashedPassword = KeyDerivation.Pbkdf2(
                password: newPassword,
                salt: "%K3v8%G@MhJ%%yFf@W6Z8StaRuwr4(!I".ToBytes(),
                prf: KeyDerivationPrf.HMACSHA512, // You can use other algorithms like HMACSHA256
                iterationCount: iterations,
                numBytesRequested: numBytesRequested);

            string hashedPasswordBase64 = Convert.ToBase64String(hashedPassword);
            string storedPasswordHash = $"{hashedPasswordBase64}";
            return storedPasswordHash;
        }


        private string GeneratToken(string userId)
        {
            var secret = configuration.GetSection("Authentication").GetSection("Secret").Value;

            var secretKey = new SymmetricSecurityKey(secret.ToBytes());
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,"Name"),
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Role, "user")
            };
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:5001",
                audience: "https://localhost:5001",
                claims: claims,
                expires: DateTime.Now.AddMinutes(9999),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }

        public Task<GetUserDto> CurrentUser()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!userId.IsGuid())
                throw new ValidationException("Token not valid");
            return _userRepository.GetAsync<GetUserDto>(userId);

        }
    }
}

