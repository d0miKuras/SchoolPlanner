using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolPlanner.Core;
using SchoolPlanner.Data;

namespace SchoolPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubjectsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ISchoolPlannerData _plannerData;

        public SubjectsController(IConfiguration configuration, ISchoolPlannerData plannerData)
        {
            _configuration = configuration;
            _plannerData = plannerData;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var groups = _plannerData.GetSubjects();
            return new JsonResult(groups);
        }

        [HttpPost]
        public JsonResult Post(Subject subject)
        {
            _plannerData.AddSubject(subject);
            return new JsonResult($"Added subject {subject.Name} successfully under ID {subject.ID}!");
        }

        [HttpPut]
        public JsonResult Put(Subject subject)
        {
            if (_plannerData.GetSubjects().FirstOrDefault(x => x.ID == subject.ID) != null)
            {
                var oldgroup = _plannerData.GetSubjects().FirstOrDefault(r => r.ID == subject.ID);
                _plannerData.EditSubject(oldgroup, subject);
                return new JsonResult($"Edited subject with ID {subject.ID} successfully!");
            }
            return new JsonResult($"There is no subject with ID {subject.ID}!");
        }

        [HttpDelete]
        public JsonResult Delete(Subject subject)
        {
            if (_plannerData.GetSubjects().FirstOrDefault(x => x.ID == subject.ID) != null)
            {
                var del = _plannerData.DeleteSubject(subject);
                return new JsonResult("Subject has been deleted!");
            }

            return new JsonResult("The subject does not exist!");
        }
    }
}