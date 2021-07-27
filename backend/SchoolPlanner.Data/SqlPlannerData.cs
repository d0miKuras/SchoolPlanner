using System.Collections.Generic;
using System.Linq;
using SchoolPlanner.Core;

namespace SchoolPlanner.Data
{
    public class SqlPlannerData : ISchoolPlannerData
    {
        private readonly SchoolPlannerDbContext db;

        public SqlPlannerData(SchoolPlannerDbContext db)
        {
            this.db = db;
        }
        // public Activity AddActivity(Activity newActivity)
        // {
        //     List<Activity> list = new List<Activity>();
        //     foreach (var act in db.Activities)
        //     {
        //         if (act.Slot == newActivity.Slot && act.Day == newActivity.Day && (act.Group == newActivity.Group || act.Teacher == newActivity.Teacher))
        //             list.Add(act);
        //     }
        //     foreach (var item in list) db.Activities.Remove(item);
        //     db.Activities.Add(newActivity);
        //     return newActivity;
        // }

        // public Group AddGroup(string group)
        // {
        //     var newGroup = new Group { Name = group };
        //     db.Groups.Add(newGroup);
        //     return newGroup;
        // }

        // public string AddListItem(string key, string item)
        // {
        //     switch (key)
        //     {
        //         case "Rooms":
        //             AddRoom(new Room { Name = item });
        //             break;
        //         case "Groups":
        //             AddGroup(item);
        //             break;
        //         case "Teachers":
        //             AddTeacher(item);
        //             break;
        //         case "Subject":
        //             AddSubject(item);
        //             break;
        //     }
        //     return item;
        // }

        public Room AddRoom(Room room)
        {
            db.Rooms.Add(room);
            db.SaveChanges();
            return room;
        }

        // public Subject AddSubject(string subject)
        // {
        //     var newSubject = new Subject { Name = subject };
        //     db.Subjects.Add(newSubject);
        //     return newSubject;
        // }

        // public Teacher AddTeacher(string teacher)
        // {
        //     var newTeacher = new Teacher { Name = teacher };
        //     db.Teachers.Add(newTeacher);
        //     return newTeacher;
        // }

        // public int Commit()
        // {
        //     return db.SaveChanges();
        // }

        public bool ContainsRoom(Room room)
        {
            foreach (var item in db.Rooms)
            {
                if (item.ID == room.ID) return true;
            }

            // var contains = db.Rooms.Contains(room.ID);
            return false;
        }

        // public Group DeleteGroup(string group)
        // {
        //     List<Activity> actsToDel = new List<Activity>();
        //     foreach (var item in db.Activities)
        //     {
        //         if (item.Group.Name == group) actsToDel.Add(item);
        //     }
        //     var groupToDel = db.Groups.FirstOrDefault(g => g.Name == group);
        //     db.Groups.Remove(groupToDel);
        //     foreach (var item in actsToDel)
        //     {
        //         db.Activities.Remove(item);
        //     }

        //     return groupToDel;
        // }

        // public string DeleteListItem(string key, string item)
        // {
        //     switch (key)
        //     {
        //         case "Rooms":
        //             DeleteRoom(item);
        //             break;

        //         case "Groups":
        //             DeleteGroup(item);
        //             break;

        //         case "Subjects":
        //             DeleteSubject(item);
        //             break;

        //         case "Teachers":
        //             DeleteTeacher(item);
        //             break;
        //     }

        //     return item;
        // }

        public Room DeleteRoom(Room room)
        {
            List<Activity> actsToDel = new List<Activity>();
            foreach (var item in db.Activities)
            {
                if (item.Room == room) actsToDel.Add(item);
            }
            var roomToDel = db.Rooms.FirstOrDefault(r => r == room);
            db.Rooms.Remove(roomToDel);
            foreach (var item in actsToDel)
            {
                db.Activities.Remove(item);
            }
            db.SaveChanges();
            return roomToDel;
            // return room;
        }

        // public Subject DeleteSubject(string subject)
        // {
        //     List<Activity> actsToDel = new List<Activity>();
        //     foreach (var item in db.Activities)
        //     {
        //         if (item.Subject.Name == subject) actsToDel.Add(item);
        //     }
        //     var subjToDel = db.Subjects.FirstOrDefault(s => s.Name == subject);
        //     db.Subjects.Remove(subjToDel);
        //     foreach (var item in actsToDel)
        //     {
        //         db.Activities.Remove(item);
        //     }

        //     return subjToDel;
        // }

        // public Teacher DeleteTeacher(string teacher)
        // {
        //     List<Activity> actsToDel = new List<Activity>();
        //     foreach (var item in db.Activities)
        //     {
        //         if (item.Teacher.Name == teacher) actsToDel.Add(item);
        //     }
        //     var teachToDel = db.Teachers.FirstOrDefault(r => r.Name == teacher);
        //     db.Teachers.Remove(teachToDel);
        //     foreach (var item in actsToDel)
        //     {
        //         db.Activities.Remove(item);
        //     }

        //     return teachToDel;
        // }

        // public Group EditGroup(string oldGroup, string newGroup)
        // {
        //     var group = db.Groups.FirstOrDefault(g => g.Name == oldGroup);
        //     group.Name = newGroup;
        //     return group;
        // }

        // public string EditListItem(string key, string oldItem, string newItem)
        // {
        //     switch (key)
        //     {
        //         case "Rooms":
        //             EditRoom(oldItem, newItem);
        //             break;

        //         case "Subjects":
        //             EditSubject(oldItem, newItem);
        //             break;

        //         case "Teachers":
        //             EditTeacher(oldItem, newItem);
        //             break;

        //         case "Groups":
        //             EditTeacher(oldItem, newItem);
        //             break;
        //     }
        //     return newItem;
        // }

        public Room EditRoom(Room oldRoom, Room newRoom)
        {
            var room = db.Rooms.FirstOrDefault(r => r.ID == oldRoom.ID);
            if (room != null)
                room.Name = newRoom.Name;

            db.SaveChanges();
            return room;
        }

        // public Subject EditSubject(string oldSubject, string newSubject)
        // {
        //     var subj = db.Subjects.FirstOrDefault(s => s.Name == oldSubject);
        //     subj.Name = newSubject;
        //     return subj;
        // }

        // public Teacher EditTeacher(string oldTeacher, string newTeacher)
        // {
        //     var teacher = db.Teachers.FirstOrDefault(t => t.Name == oldTeacher);
        //     teacher.Name = newTeacher;
        //     // check if it automatically changes in activities
        //     return teacher;
        // }

        // public IEnumerable<Activity> GetActivitiesByRoom(string room)
        // {
        //     List<Activity> returnList = new List<Activity>();
        //     foreach (var act in db.Activities)
        //     {
        //         if (act.Room.Name == room) returnList.Add(act);
        //     }
        //     return returnList;
        // }

        // public Activity GetActivity(string room, int slot, int day)
        // {
        //     return db.Activities.FirstOrDefault(a => a.Room.Name == room && a.Slot == slot && a.Day == day);
        // }

        // public IEnumerable<Group> GetGroups()
        // {
        //     return db.Groups;
        // }

        public PlannerData GetPlannerData()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Room> GetRooms()
        {
            return db.Rooms;
        }

        // public IEnumerable<Subject> GetSubjects()
        // {
        //     return db.Subjects;
        // }

        // public IEnumerable<Teacher> GetTeachers()
        // {
        //     return db.Teachers;
        // }

        // public Activity RemoveActivity(Activity remAct)
        // {
        //     db.Activities.Remove(remAct);
        //     return remAct;
        // }

        // public Activity UpdateActivities(Activity updatedAct)
        // {
        //     var act = db.Activities.FirstOrDefault(a => a.Room == updatedAct.Room && a.Slot == updatedAct.Slot && a.Day == updatedAct.Day);
        //     if (act != null)
        //     {
        //         act.Group = updatedAct.Group;
        //         act.Teacher = updatedAct.Teacher;
        //         act.Subject = updatedAct.Subject;
        //     }
        //     else AddActivity(updatedAct);
        //     return act;
        // }
    }
}