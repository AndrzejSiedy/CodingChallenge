using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Models
{
    public class Lov
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }


    public class LovGender
    {
        public static IEnumerable<Lov> Get()
        {
            return new List<Lov>() {
                new Lov(){ Id = 0, Value = "Male"},
                new Lov(){ Id = 1, Value = "Female"}
            };
        }
    }

    public class LovTitle
    {
        public static IEnumerable<Lov> Get()
        {
            return new List<Lov>() {
                new Lov(){ Id = 0, Value = "Mr"},
                new Lov(){ Id = 1, Value = "Mrs"},
                new Lov(){ Id = 2, Value = "Miss"},
                new Lov(){ Id = 3, Value = "Ms"}
            };
        }
    }
    public class LovNationality
    {
        public static IEnumerable<Lov> Get()
        {
            return new List<Lov>() {
                new Lov(){ Id = 0, Value = "GB"},
                new Lov(){ Id = 1, Value = "US"},
                new Lov(){ Id = 2, Value = "DK"},
                new Lov(){ Id = 3, Value = "FR"}
            };
        }
    }
}
