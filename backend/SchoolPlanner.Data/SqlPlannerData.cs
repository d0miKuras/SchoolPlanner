using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
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
        public int AddActivity(Activity newActivity)
        {
            var existingActivity = GetActivities().FirstOrDefault(x => x.Slot == newActivity.Slot && x.Day == newActivity.Day && x.Room.ID == newActivity.Room.ID
                                                                    && x.Subject.ID == newActivity.Subject.ID && x.Teacher.ID == newActivity.Teacher.ID
                                                                    && x.Group.ID == newActivity.Group.ID);
            if (existingActivity != null)
                return 1;

            var existingRoom = GetRooms().FirstOrDefault(x => x.ID == newActivity.Room.ID);
            var existingGroup = GetGroups().FirstOrDefault(x => x.ID == newActivity.Group.ID);
            var existingTeacher = GetTeachers().FirstOrDefault(x => x.ID == newActivity.Teacher.ID);
            var existingSubject = GetSubjects().FirstOrDefault(x => x.ID == newActivity.Subject.ID);
            if (existingRoom == null || existingGroup == null || existingTeacher == null || existingSubject == null)
                return 2;
            List<Activity> list = new List<Activity>();
            foreach (var act in db.Activities)
            {
                if (act.Slot == newActivity.Slot && act.Day == newActivity.Day && (act.Group.ID == newActivity.Group.ID || act.Teacher.ID == newActivity.Teacher.ID))
                    list.Add(act);
            }
            db.Activities.RemoveRange(list);
            db.Activities.Add(new Activity
            {
                ID = newActivity.ID,
                Room = existingRoom,
                Teacher = existingTeacher,
                Subject = existingSubject,
                Group = existingGroup,
                Slot = newActivity.Slot,
                Day = newActivity.Day
            });
            // db.Activities.Add(newActivity);
            db.SaveChanges();
            return 0;
        }

        public int AddGroup(Group group)
        {
            var existingGroup = db.Groups.FirstOrDefault(x => x == group);
            if (existingGroup != null)
                return 1;
            db.Groups.Add(group);
            db.SaveChanges();
            return 0;
        }

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

        public int AddRoom(Room room)
        {
            var existingRoom = db.Rooms.FirstOrDefault(x => x == room);
            if (existingRoom != null)
                return 1;
            // if (room.ID == null) room.ID = db.Rooms.Find(room => Max(room.ID)).ID + 1;
            db.Rooms.Add(room);
            db.SaveChanges();
            return 0;
        }

        public int AddSubject(Subject subject)
        {
            var existingSubject = db.Subjects.FirstOrDefault(x => x == subject);
            if (existingSubject != null)
                return 1;
            db.Subjects.Add(subject);
            db.SaveChanges();
            return 0;
        }

        public int AddTeacher(Teacher teacher)
        {
            var existingTeacher = db.Teachers.FirstOrDefault(x => x == teacher);
            if (existingTeacher != null)
                return 1;
            db.Teachers.Add(teacher);
            db.SaveChanges();
            return 0;
        }

        // public int Commit()
        // {
        //     return db.SaveChanges();
        // }

        public bool ContainsRoom(Room room)
        {
            var existingRoom = db.Rooms.FirstOrDefault(x => x.ID == room.ID);
            if (existingRoom != null)
                return true;
            return false;
        }

        public int DeleteGroup(Group group)
        {
            List<Activity> actsToDel = new List<Activity>();
            foreach (var item in db.Activities)
            {
                if (item.Group == group) actsToDel.Add(item);
            }
            var groupToDel = db.Groups.FirstOrDefault(g => g == group);
            if (groupToDel == null)
                return 1;
            db.Groups.Remove(groupToDel);
            db.Activities.RemoveRange(actsToDel);
            db.SaveChanges();
            return 0;
        }

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

        public int DeleteRoom(Room room)
        {
            List<Activity> actsToDel = new List<Activity>();
            foreach (var item in db.Activities)
            {
                if (item.Room == room) actsToDel.Add(item);
            }
            var roomToDel = db.Rooms.FirstOrDefault(r => r == room);
            if (roomToDel == null)
                return 1;
            db.Rooms.Remove(roomToDel);
            db.Activities.RemoveRange(actsToDel);
            db.SaveChanges();
            return 0;
        }

        public int DeleteSubject(Subject subject)
        {
            List<Activity> actsToDel = new List<Activity>();
            foreach (var item in db.Activities)
            {
                if (item.Subject == subject) actsToDel.Add(item);
            }
            var subjToDel = db.Subjects.FirstOrDefault(s => s == subject);
            if (subjToDel == null)
                return 1;
            db.Subjects.Remove(subjToDel);
            db.Activities.RemoveRange(actsToDel);
            db.SaveChanges();
            return 0;
        }

        public int DeleteTeacher(Teacher teacher)
        {
            var teachToDel = db.Teachers.FirstOrDefault(r => r == teacher);
            if (teachToDel == null)
                return 1;
            List<Activity> actsToDel = new List<Activity>();
            foreach (var item in db.Activities)
            {
                if (item.Teacher == teacher) actsToDel.Add(item);
            }

            db.Teachers.Remove(teachToDel);
            db.Activities.RemoveRange(actsToDel);
            db.SaveChanges();
            return 0;
        }

        public int EditGroup(Group oldGroup, Group newGroup)
        {
            var group = db.Groups.FirstOrDefault(g => g.ID == oldGroup.ID);
            if (group == null)
                return 1;
            group.Name = newGroup.Name;
            db.SaveChanges();
            return 0;
        }

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

        public int EditRoom(Room oldRoom, Room newRoom)
        {
            var room = db.Rooms.FirstOrDefault(r => r.ID == oldRoom.ID);
            if (room == null)
                return 1;
            room.Name = newRoom.Name;

            db.SaveChanges();
            return 0;
        }

        public int EditSubject(Subject oldSubject, Subject newSubject)
        {
            var subj = db.Subjects.FirstOrDefault(s => s.ID == oldSubject.ID);
            if (subj == null)
                return 1;
            subj.Name = newSubject.Name;
            db.SaveChanges();
            return 0;
        }

        public int EditTeacher(Teacher oldTeacher, Teacher newTeacher)
        {
            var teacher = db.Teachers.FirstOrDefault(t => t == oldTeacher);
            if (teacher == null)
                return 1;
            teacher.Name = newTeacher.Name;
            db.SaveChanges();
            // check if it automatically changes in activities
            return 0;
        }

        public IEnumerable<Activity> GetActivitiesByRoom(int roomID)
        {
            return db.Activities.Include(i => i.Teacher)
                                .Include(i => i.Subject)
                                .Include(i => i.Room)
                                .Include(i => i.Group)
                                .Where(x => x.Room.ID == roomID)
                                .ToList();
        }

        public Activity GetActivity(Room room, int slot, int day)
        {
            return db.Activities.FirstOrDefault(a => a.Room == room && a.Slot == slot && a.Day == day);
        }

        public IEnumerable<Group> GetGroupsAsNoTracking()
        {
            return db.Groups.AsNoTracking().ToList();
        }

        public PlannerData GetPlannerData()
        {
            PlannerData planner = new PlannerData
            {
                Activities = GetActivities().ToList(),
                Rooms = GetRooms().ToList(),
                Groups = GetGroups().ToList(),
                Teachers = GetTeachers().ToList(),
                Subjects = GetSubjects().ToList()
            };
            return planner;
        }

        public IEnumerable<Room> GetRoomsAsNoTracking()
        {
            return db.Rooms.AsNoTracking().ToList();
        }

        public IEnumerable<Subject> GetSubjectsAsNoTracking()
        {
            return db.Subjects.AsNoTracking().ToList();
        }

        public IEnumerable<Teacher> GetTeachersAsNoTracking()
        {
            return db.Teachers.AsNoTracking().ToList();
        }

        public IEnumerable<Activity> GetActivities()
        {
            // var acts = db.Activities;
            return db.Activities.Include(i => i.Teacher)
                                .Include(i => i.Subject)
                                .Include(i => i.Room)
                                .Include(i => i.Group)
                                .ToList();
        }

        public IEnumerable<Activity> GetActivitiesAsNoTracking()
        {
            // var acts = db.Activities;
            return db.Activities.Include(i => i.Teacher).AsNoTracking()
                                .Include(i => i.Subject).AsNoTracking()
                                .Include(i => i.Room).AsNoTracking()
                                .Include(i => i.Group).AsNoTracking()
                                .ToList();
        }

        public int RemoveActivity(Activity remAct)
        {
            var existingActivity = GetActivities().FirstOrDefault(x => x.Slot == remAct.Slot && x.Day == remAct.Day && x.Room.ID == remAct.Room.ID
                                                                    && x.Subject.ID == remAct.Subject.ID && x.Teacher.ID == remAct.Teacher.ID
                                                                    && x.Group.ID == remAct.Group.ID);
            if (existingActivity == null)
                return 1;

            var existingRoom = GetRoomsAsNoTracking().FirstOrDefault(x => x.ID == remAct.Room.ID);
            var existingGroup = GetGroupsAsNoTracking().FirstOrDefault(x => x.ID == remAct.Group.ID);
            var existingTeacher = GetTeachersAsNoTracking().FirstOrDefault(x => x.ID == remAct.Teacher.ID);
            var existingSubject = GetSubjectsAsNoTracking().FirstOrDefault(x => x.ID == remAct.Subject.ID);
            if (existingRoom == null || existingGroup == null || existingTeacher == null || existingSubject == null)
                return 2;

            db.Activities.Remove(existingActivity);
            // db.Activities.Remove(new Activity
            // {
            //     Room = existingRoom,
            //     Teacher = existingTeacher,
            //     Subject = existingSubject,
            //     Group = existingGroup,
            //     Slot = remAct.Slot,
            //     Day = remAct.Day
            // });
            db.SaveChanges();
            return 0;
        }


        public IEnumerable<Room> GetRooms()
        {
            return db.Rooms;
        }

        public IEnumerable<Teacher> GetTeachers()
        {
            return db.Teachers;
        }

        public IEnumerable<Subject> GetSubjects()
        {
            return db.Subjects;
        }

        public IEnumerable<Group> GetGroups()
        {
            return db.Groups;
        }

        public int EditActivity(Activity oldAct, Activity newAct)
        {
            var act = GetActivities().FirstOrDefault(a => a.Room.ID == oldAct.Room.ID && a.Slot == oldAct.Slot && a.Day == oldAct.Day);
            // var act = db.Activities.Include(i => i.Teacher).AsNoTracking()
            //                     .Include(i => i.Subject).AsNoTracking()
            //                     .Include(i => i.Room).AsNoTracking()
            //                     .Include(i => i.Group).AsNoTracking()
            //                     .ToList().FirstOrDefault(a => a.Room.ID == oldAct.Room.ID && a.Slot == oldAct.Slot && a.Day == oldAct.Day);
            if (act == null)
                return 1;
            var existingGroup = GetGroupsAsNoTracking().FirstOrDefault(x => x.ID == newAct.Group.ID);
            var existingTeacher = GetTeachersAsNoTracking().FirstOrDefault(x => x.ID == newAct.Teacher.ID);
            var existingSubject = GetSubjectsAsNoTracking().FirstOrDefault(x => x.ID == newAct.Subject.ID);
            if (existingGroup == null || existingTeacher == null || existingSubject == null)
                return 2;


            // db.Activities.Remove(act);
            Activity newActivity = new Activity // to give id
            {
                ID = oldAct.ID,
                Room = newAct.Room,
                Subject = newAct.Subject,
                Teacher = newAct.Teacher,
                Group = newAct.Group,
                Day = newAct.Day,
                Slot = newAct.Slot
            };
            // act.Group = existingGroup;
            // act.Teacher = existingTeacher;
            // act.Subject = existingSubject;
            RemoveActivity(oldAct);
            AddActivity(newActivity);
            // db.Activities.Add(new Activity
            // {
            //     ID = act.ID,
            //     Room = act.Room,
            //     Slot = act.Slot,
            //     Day = act.Day,
            //     Group = existingGroup,
            //     Teacher = existingTeacher,
            //     Subject = existingSubject
            // });
            // db.SaveChanges();

            return 0;
        }
    }
}