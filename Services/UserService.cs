using AutoMapper;
using CodingChallenge.Models;
using CodingChallenge.Utils;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Services
{
    public class UserService : IUserService
    {
        private IMemoryCache _cache;
        private IMapper _mapper;

        public UserService(IMemoryCache cache, IMapper mapper)
        {
            _cache = cache;
            _mapper = mapper;
        }

        public IEnumerable<UserDto> GetUsers()
        {
            var users = _GetUsers();
            var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);
            return usersDto;
        }

        public bool Delete(int id)
        {
            var success = true;
            var users = _GetUsers();
            var user = users.FirstOrDefault(u => u.Id == id);
            if(user != null)
            {
                users = users.Where(u => u.Id != id);
                _SetUserCache(users);
            }
            else
            {
                success = false;
            }
            return success;
        }

        private IEnumerable<User> _GetUsers()
        {
            var users = _cache.Get<IEnumerable<User>>("users");
            if (users == null || users.Count() == 0)
            {
                users = DataHelper.GenerateData();
                _SetUserCache(users);
            }
            return users;
        }

        private void _SetUserCache(IEnumerable<User> users)
        {
            _cache.Set("users", users);
        }
    }
}
