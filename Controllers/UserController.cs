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
            return new ServiceResponse<UserDto>
            {
                Data = user
            };
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

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
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
