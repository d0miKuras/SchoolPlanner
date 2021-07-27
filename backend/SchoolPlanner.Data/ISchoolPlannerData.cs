using System.Collections.Generic;
using System.Linq;
using SchoolPlanner.Core;


namespace SchoolPlanner.Data
{
    public interface ISchoolPlannerData
    {
        PlannerData GetPlannerData();
        IEnumerable<Room> GetRooms();
        // IEnumerable<Teacher> GetTeachers();
        // IEnumerable<Subject> GetSubjects();
        // IEnumerable<Group> GetGroups();

        Room AddRoom(Room room);
        Room EditRoom(Room oldRoom, Room newRoom);
        Room DeleteRoom(Room room);
        // Teacher AddTeacher(string teacher);
        // Teacher EditTeacher(string oldTeacher, string newTeacher);
        // Teacher DeleteTeacher(string teacher);
        // Group AddGroup(string group);
        // Group EditGroup(string oldGroup, string newGroup);
        // Group DeleteGroup(string group);
        // Subject AddSubject(string subject);
        // Subject EditSubject(string oldSubject, string newSubject);
        // Subject DeleteSubject(string subject);
        // Activity GetActivity(string room, int slot, int day);

        bool ContainsRoom(Room room);

        // Activity UpdateActivities(Activity updatedAct);
        // Activity AddActivity(Activity newActivity);
        // Activity RemoveActivity(Activity remAct);

        // string AddListItem(string key, string item);
        // string EditListItem(string key, string oldItem, string newItem);

        // string DeleteListItem(string key, string item);
        // int Commit();
        // IEnumerable<Activity> GetActivitiesByRoom(string room);

    }


}
