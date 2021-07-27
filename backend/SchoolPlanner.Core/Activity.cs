// using SchoolPlanner.API;

namespace SchoolPlanner.Core
{
    public class Activity
    {
        public int ID { get; set; }

        public Teacher Teacher { get; set; }

        public Room Room { get; set; }

        public Subject Subject { get; set; }

        public Group Group { get; set; }

        public int Slot { get; set; }

        public int Day { get; set; }
    }
}