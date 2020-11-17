using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodingChallenge.Models
{
    public enum Gender
    {
        Male,
        Female
    }

    public enum Title
    {
        Mr,
        Mrs,
        Miss,
        Ms
    }

    public enum Nationality
    {
        GB,
        US,
        DK,
        FR
    }

    public class Name
    {
        [JsonProperty("title")]
        [JsonConverter(typeof(StringEnumConverter))]
        public Title Title { get; set; }
        [JsonProperty("first")]
        public string First { get; set; }
        [JsonProperty("last")]
        public string Last { get; set; }
    }

    public class DOB
    {
        [JsonProperty("date")]
        public DateTime Date { get; set; }
        [JsonProperty("age")]
        public int Age { get; set; }
    }

    public class Picture
    {
        [JsonProperty("large")]
        public string Large { get; set; }
        [JsonProperty("medium")]
        public string Medium { get; set; }
        [JsonProperty("thumbnail")]
        public string Thumbnail { get; set; }
    }

    public class User
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonProperty("name")]
        public Name Name { get; set; }
        public string Password { get; set; }

        [JsonProperty("gender")]
        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }
        [JsonProperty("nat")]
        [JsonConverter(typeof(StringEnumConverter))]
        public Nationality Nationality { get; set; }
        [JsonProperty("dob")]
        public DOB Dob { get; set; }
        [JsonProperty("email")]
        public string Email { get; set; }
        [JsonProperty("picture")]
        public Picture Picture { get; set; }
    }
}
