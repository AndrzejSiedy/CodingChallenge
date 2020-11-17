using CodingChallenge.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Services
{
    public class ConfigService : IConfigService
    {
        private IMemoryCache _cache;

        public ConfigService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public ViewConfig GetConfig()
        {
            return new ViewConfig()
            {
                Gender = GetGender(),
                Nationalities = GetNationalities(),
                Title = GetTitle()
            };
        }





        private IEnumerable<Lov> GetTitle()
        {
            var title = _cache.Get<IEnumerable<Lov>>("title");
            if (title == null || title.Count() == 0)
            {
                title = LovTitle.Get();
                _cache.Set("title", title);
            }
            return title;
        }
        private IEnumerable<Lov> GetGender()
        {
            var gender = _cache.Get<IEnumerable<Lov>>("gender");
            if (gender == null || gender.Count() == 0)
            {
                gender = LovGender.Get();
                _cache.Set("gender", gender);
            }
            return gender;
        }
        private IEnumerable<Lov> GetNationalities()
        {
            var nat = _cache.Get<IEnumerable<Lov>>("nat");
            if (nat == null || nat.Count() == 0)
            {
                nat = LovNationality.Get();
                _cache.Set("nat", nat);
            }
            return nat;
        }
    }
}
