using AutoMapper;
using CodingChallenge.Models;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Utils
{
    public class DataHelper
    {
        public static IEnumerable<User> GenerateData()
        {
            var data = JsonConvert.DeserializeObject<List<User>>(File.ReadAllText(@".\Utils\raw-data.json"));
            for (int i = 0; i < data.Count; i++)
            {
                var u = data[i];
                u.Id = i + 1;
                u.Password = Guid.NewGuid().ToString();
            }
            return data;
        }

    }
}
