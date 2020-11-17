using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Models
{
    public class ServiceResponse<T>
    {
        public int Total { get; set; }
        public T Data { get; set; }
        public string Error { get; set; }
    }
}
