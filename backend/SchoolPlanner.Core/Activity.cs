// using SchoolPlanner.API;

using System.ComponentModel.DataAnnotations;

namespace SchoolPlanner.Core
{
    public class Activity
    {
        public int ID { get; set; }

        [Required]
        public Teacher Teacher { get; set; }

        [Required]
        public Room Room { get; set; }

        [Required]
        public Subject Subject { get; set; }

        [Required]
        public Group Group { get; set; }

        [Required]
        public int Slot { get; set; }

        [Required]
        public int Day { get; set; }
    }
}