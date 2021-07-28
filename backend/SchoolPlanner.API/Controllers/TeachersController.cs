using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolPlanner.Core;
using SchoolPlanner.Data;

namespace SchoolPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeachersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ISchoolPlannerData _plannerData;

        public TeachersController(IConfiguration configuration, ISchoolPlannerData plannerData)
        {
            _configuration = configuration;
            _plannerData = plannerData;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var groups = _plannerData.GetTeachers();
            return new JsonResult(groups);
        }

        [HttpPost]
        public JsonResult Post(Teacher teacher)
        {
            _plannerData.AddTeacher(teacher);
            return new JsonResult($"Added teacher {teacher.Name} successfully under ID {teacher.ID}!");
        }

        [HttpPut]
        public JsonResult Put(Teacher teacher)
        {
            if (_plannerData.GetTeachers().FirstOrDefault(x => x.ID == teacher.ID) != null)
            {
                var oldgroup = _plannerData.GetTeachers().FirstOrDefault(r => r.ID == teacher.ID);
                _plannerData.EditTeacher(oldgroup, teacher);
                return new JsonResult($"Edited teacher with ID {teacher.ID} successfully!");
            }
            return new JsonResult($"There is no teacher with ID {teacher.ID}!");
        }

        [HttpDelete]
        public JsonResult Delete(Teacher teacher)
        {
            if (_plannerData.GetTeachers().FirstOrDefault(x => x.ID == teacher.ID) != null)
            {
                var del = _plannerData.DeleteTeacher(teacher);
                return new JsonResult("Teacher has been deleted!");
            }

            return new JsonResult("The teacher does not exist!");
        }
    }
}