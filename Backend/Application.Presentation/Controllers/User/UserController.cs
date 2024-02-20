using App.Application.Services;
using App.Application.ViewModels.User.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Application.Presentation.Controllers.User
{
    [Authorize(Roles = "Manager")]
    public class UserController : CRUDContriller<UserService, AddNewUserDto, GetUserDto>
    {

        private readonly UserService _userService;
        public UserController(UserService userServices, UserService userService) : base(userServices)
        {
            _userService = userService;
        }


        [AllowAnonymous]
        [HttpPost("passwordLogin")]
        public async Task<IActionResult> PasswordLogin([FromBody] PasswordLoginVM user)
        {

            await _userService.PasswordLogin(user);

            //        if (user.UserName == "johndoe" && user.Password == "def@123")
            //        {
            //            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKdfg345fedg453dfgfgfhey@34ssssss5"));
            //            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            //            var claims = new List<Claim>
            //{
            //    new Claim(ClaimTypes.Name, user.UserName),
            //    new Claim(ClaimTypes.Role, "Manager")
            //};
            //            var tokeOptions = new JwtSecurityToken(
            //                issuer: "https://localhost:5001",
            //                audience: "https://localhost:5001",
            //                claims: claims,
            //                expires: DateTime.Now.AddMinutes(9999),
            //                signingCredentials: signinCredentials
            //            );
            //            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            //            return Ok(tokenString);
            //        }

            return Unauthorized();
        }
    }

}