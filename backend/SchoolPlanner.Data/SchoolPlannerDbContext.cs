using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using SchoolPlanner.Core;

namespace SchoolPlanner.Data
{
    public class SchoolPlannerDbContext : DbContext
    {
        public SchoolPlannerDbContext(DbContextOptions<SchoolPlannerDbContext> options) : base(options) { }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Group> Groups { get; set; }

    }
}