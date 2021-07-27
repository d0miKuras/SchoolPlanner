using System.Collections.Generic;
// using SchoolPlanner.API;

namespace SchoolPlanner.Core
{
    public class PlannerData
    {
        public List<Room> Rooms { get; set; }
        public List<Teacher> Teachers { get; set; }
        public List<Group> Groups { get; set; }
        public List<Subject> Subjects { get; set; }
        public List<Activity> Activities { get; set; }

    }
}