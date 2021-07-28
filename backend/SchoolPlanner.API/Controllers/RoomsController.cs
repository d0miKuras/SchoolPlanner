using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolPlanner.Core;
using SchoolPlanner.Data;

namespace SchoolPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ISchoolPlannerData _plannerData;

        public RoomsController(IConfiguration configuration, ISchoolPlannerData plannerData)
        {
            _configuration = configuration;
            _plannerData = plannerData;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var rooms = _plannerData.GetRooms();
            // DataTable table = new DataTable();
            // foreach(var room in rooms)
            // {
            //     table.LoadDataRow(room, true);
            // }
            return new JsonResult(rooms);
        }

        [HttpPost]
        public JsonResult Post(Room room)
        {
            _plannerData.AddRoom(room);
            return new JsonResult($"Added room {room.Name} successfully under ID {room.ID}!");
        }

        [HttpPut]
        public JsonResult Put(Room room)
        {
            if (_plannerData.ContainsRoom(room))
            {
                var oldRoom = _plannerData.GetRooms().FirstOrDefault(r => r.ID == room.ID);
                _plannerData.EditRoom(oldRoom, room);
                return new JsonResult($"Edited room with ID {room.ID} successfully!");
            }
            return new JsonResult($"There is no room with ID {room.ID}!");
        }

        [HttpDelete]
        public JsonResult Delete(Room room)
        {
            if (!_plannerData.ContainsRoom(room))
                return new JsonResult("The room does not exist!");

            var del = _plannerData.DeleteRoom(room);
            return new JsonResult("Room has been deleted!");
        }
    }
}