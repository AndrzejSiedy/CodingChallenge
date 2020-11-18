using CodingChallenge.Models;
using CodingChallenge.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CodingChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public ServiceResponse<UserDto> GetUser(int id)
        {
            var user = _userService.GetUsers().FirstOrDefault(u => u.Id == id);
            var resp = new ServiceResponse<UserDto>
            {
                Data = user
            };

            if (user == null)
            {
                resp.Error = "User not found";
            }
            return resp;
        }

        [HttpGet]
        public ServiceResponse<IEnumerable<UserDto>> GetUsers()
        {
            var users = _userService.GetUsers();
            return new ServiceResponse<IEnumerable<UserDto>>
            {
                Data = users,
                Total = users.Count()
            };
        }

        [HttpPost]
        public ServiceResponse<UserDto> Post([FromBody] UserDto user)
        {
            var userDto = _userService.Create(user);
            return new ServiceResponse<UserDto>()
            {
                Data = userDto
            };
        }

        [HttpPut]
        public ServiceResponse<UserDto> Put([FromBody] UserDto user)
        {
            var userDto = _userService.Update(user);
            return new ServiceResponse<UserDto>()
            {
                Data = userDto
            };
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public ServiceResponse<bool> Delete(int id)
        {
            var success = _userService.Delete(id);
            return new ServiceResponse<bool>()
            {
                Data = success
            };
        }
    }
}
