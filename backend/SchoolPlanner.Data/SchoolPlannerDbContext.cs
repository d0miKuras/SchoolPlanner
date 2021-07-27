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

        // protected override void OnConfiguring(DbContextOptionsBuilder options)
        //     => options.UseMySql("server=localhost;user=root;database=schoolplanner;port=3306;Connect Timeout=5;",
        //     new MariaDbServerVersion(new Version(10, 4, 19)));

    }
}