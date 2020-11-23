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

        public UserDto GetUser(int id)
        {
            var users = _GetUsers();
            var u = users.FirstOrDefault(u => u.Id == id);
            if(u != null) {
                return _mapper.Map<UserDto>(u);
            }
            return null;
        }

        public UserDto Create(UserDto user)
        {
            var users = _GetUsers().ToList();
            var u = _mapper.Map<User>(user);
            u.Password = Guid.NewGuid().ToString();
            var tempPictureUrl = "../../../assets/no-see.png";
            u.Picture = new Picture()
            {
                Large = tempPictureUrl,
                Medium = tempPictureUrl,
                Thumbnail = tempPictureUrl
            };
            var maxId = users.Select(u => u.Id).Max();
            u.Id = maxId + 1;

            users.Add(u);
            _SetUserCache(users);
            return user;
        }

        public UserDto Update(UserDto user)
        {
            var users = _GetUsers().ToList();
            var userToBeUpdated = users.FirstOrDefault(u => u.Id == user.Id);
            if (userToBeUpdated != null)
            {
                var mappedUser = _mapper.Map<User>(user);
                userToBeUpdated.Dob = mappedUser.Dob;
                userToBeUpdated.Email = mappedUser.Email;
                userToBeUpdated.Gender = mappedUser.Gender;
                userToBeUpdated.Name = mappedUser.Name;
                userToBeUpdated.Nationality = mappedUser.Nationality;
                userToBeUpdated.Password = mappedUser.Password;
                userToBeUpdated.Picture = mappedUser.Picture;

                //users[user.Id] = userToBeUpdated;
                _SetUserCache(users);
            }
            return user;
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
