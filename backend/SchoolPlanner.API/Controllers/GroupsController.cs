using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolPlanner.Core;
using SchoolPlanner.Data;

namespace SchoolPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ISchoolPlannerData _plannerData;

        public GroupsController(IConfiguration configuration, ISchoolPlannerData plannerData)
        {
            _configuration = configuration;
            _plannerData = plannerData;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var groups = _plannerData.GetGroups();
            return new JsonResult(groups);
        }

        [HttpPost]
        public JsonResult Post(Group group)
        {
            _plannerData.AddGroup(group);
            return new JsonResult($"Added group {group.Name} successfully under ID {group.ID}!");
        }

        [HttpPut]
        public JsonResult Put(Group group)
        {
            if (_plannerData.GetGroups().FirstOrDefault(x => x.ID == group.ID) != null)
            {
                var oldgroup = _plannerData.GetGroups().FirstOrDefault(r => r.ID == group.ID);
                _plannerData.EditGroup(oldgroup, group);
                return new JsonResult($"Edited group with ID {group.ID} successfully!");
            }
            return new JsonResult($"There is no group with ID {group.ID}!");
        }

        [HttpDelete]
        public JsonResult Delete(Group group)
        {
            if (_plannerData.GetGroups().FirstOrDefault(x => x.ID == group.ID) != null)
            {
                var del = _plannerData.DeleteGroup(group);
                return new JsonResult("Group has been deleted!");
            }

            return new JsonResult("The group does not exist!");
        }
    }
}