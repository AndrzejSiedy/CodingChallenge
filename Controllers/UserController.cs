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
        public IActionResult GetUser(int id)
        {
            var user = _userService.GetUser(id);
            if(user != null)
            {
                return Ok(new ServiceResponse<UserDto>
                {
                    Data = user
                });
            }

            return NotFound(new ServiceResponse<UserDto>
            {
                Error = "User not found"
            });
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _userService.GetUsers();
            return Ok(new ServiceResponse<IEnumerable<UserDto>>
            {
                Data = users,
                Total = users.Count()
            });
        }

        [HttpPost]
        public IActionResult Post([FromBody] UserDto user)
        {
            var userDto = _userService.Create(user);
            return Ok(new ServiceResponse<UserDto>()
            {
                Data = userDto
            });
        }

        [HttpPut]
        public IActionResult Put([FromBody] UserDto user)
        {
            var userDto = _userService.Update(user);
            return Ok(new ServiceResponse<UserDto>()
            {
                Data = userDto
            });
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _userService.Delete(id);
            return Ok(new ServiceResponse<bool>()
            {
                Data = success
            });
        }
    }
}
