using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public Name Name { get; set; }

        public Gender Gender { get; set; }
        public Nationality Nationality { get; set; }
        public DOB Dob { get; set; }
        public string Email { get; set; }
        public Picture Picture { get; set; }
    }
}
