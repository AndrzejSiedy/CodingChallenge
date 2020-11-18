using CodingChallenge.Models;
using System.Collections.Generic;

namespace CodingChallenge.Services
{
    public interface IUserService
    {
        bool Delete(int id);
        UserDto Update(UserDto user);
        IEnumerable<UserDto> GetUsers();
    }
}