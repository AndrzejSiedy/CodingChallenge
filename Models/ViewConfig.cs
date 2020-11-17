using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Models
{
    public class ViewConfig
    {
        public IEnumerable<Lov> Nationalities { get; set; }
        public IEnumerable<Lov> Title { get; set; }
        public IEnumerable<Lov> Gender { get; set; }
    }
}
