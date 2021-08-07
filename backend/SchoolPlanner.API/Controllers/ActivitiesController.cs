using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolPlanner.Core;
using SchoolPlanner.Data;
using Newtonsoft.Json;

namespace SchoolPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ISchoolPlannerData _plannerData;

        public ActivitiesController(IConfiguration configuration, ISchoolPlannerData plannerData)
        {
            _configuration = configuration;
            _plannerData = plannerData;
        }

        [HttpGet("{roomName}")]
        public JsonResult Get(string roomName)
        {
            var activities = _plannerData.GetActivitiesByRoom(roomName);
            return new JsonResult(activities);
        }

        [HttpPost("{activity.Room.Id}/{activity.day}/{activity.slot}")]
        public JsonResult Post(Activity activity)
        {
            var returnCode = _plannerData.AddActivity(activity);
            if (returnCode == 0)
                return new JsonResult("Added successfully!");
            else if (returnCode == 1)
                return new JsonResult("This activity already exists");
            else
                return new JsonResult("Either the room, the group, the teacher or the subject do not exist");
        }

        [HttpPut]
        public JsonResult Put(Activity newActivity)
        {
            var oldAct = _plannerData.GetActivities().FirstOrDefault(x => x.Slot == newActivity.Slot && x.Day == newActivity.Day && x.Room.ID == newActivity.Room.ID);
            if (oldAct != null)
            {
                _plannerData.EditActivity(oldAct, newActivity);
                return new JsonResult($"Edited activity with ID {newActivity.ID} successfully!");
            }
            return new JsonResult($"There is no activity with ID {newActivity.ID}!");
        }

        [HttpDelete]
        public JsonResult Delete(Activity activity)
        {
            var returnCode = _plannerData.RemoveActivity(activity);
            if (returnCode == 0)
                return new JsonResult("Successfully removed!");
            else if (returnCode == 1)
                return new JsonResult("This activity does not exist!");
            else
                return new JsonResult("Either the room, the group, the teacher or the subject do not exist");
        }
    }
}