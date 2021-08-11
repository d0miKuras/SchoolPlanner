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
    public class DataController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ISchoolPlannerData _plannerData;

        public DataController(IConfiguration configuration, ISchoolPlannerData plannerData)
        {
            _configuration = configuration;
            _plannerData = plannerData;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var data = _plannerData.GetPlannerData();
            return new JsonResult(data);
        }
    }
}