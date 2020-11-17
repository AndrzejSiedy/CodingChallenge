using AutoMapper;
using CodingChallenge.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Mapper
{
    public class AutomapperConfig: Profile
    {
        public AutomapperConfig()
        {
            CreateMap<User, UserDto>().ReverseMap()
                .ForMember(d => d.Password, opt => opt.Ignore());
        }
    }
}
