using System.Collections.Generic;
using System.Linq;
using SchoolPlanner.Core;


namespace SchoolPlanner.Data
{
    public interface ISchoolPlannerData
    {
        PlannerData GetPlannerData();
        IEnumerable<Room> GetRoomsAsNoTracking();
        IEnumerable<Teacher> GetTeachersAsNoTracking();
        IEnumerable<Subject> GetSubjectsAsNoTracking();
        IEnumerable<Group> GetGroupsAsNoTracking();
        IEnumerable<Room> GetRooms();
        IEnumerable<Teacher> GetTeachers();
        IEnumerable<Subject> GetSubjects();
        IEnumerable<Group> GetGroups();
        IEnumerable<Activity> GetActivities();

        int AddRoom(Room room);
        int EditRoom(Room oldRoom, Room newRoom);
        int DeleteRoom(Room room);

        int AddTeacher(Teacher teacher);
        int EditTeacher(Teacher oldTeacher, Teacher newTeacher);
        int DeleteTeacher(Teacher teacher);

        int AddGroup(Group group);
        int EditGroup(Group oldGroup, Group newGroup);
        int DeleteGroup(Group group);

        int AddSubject(Subject subject);
        int EditSubject(Subject oldSubject, Subject newSubject);
        int DeleteSubject(Subject subject);

        Activity GetActivity(Room room, int slot, int day);

        bool ContainsRoom(Room room);

        int EditActivity(Activity oldAct, Activity newAct);
        int AddActivity(Activity newActivity);
        int RemoveActivity(Activity remAct);

        // string AddListItem(string key, string item);
        // string EditListItem(string key, string oldItem, string newItem);

        // string DeleteListItem(string key, string item);
        // int Commit();
        IEnumerable<Activity> GetActivitiesByRoom(int roomID);

    }


}
