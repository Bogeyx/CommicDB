using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CommicDB.Controllers
{
    public class DataController : Controller
    {
        [HttpGet]
        public String ExampleGet()
        {
            return "Get";
        }

        [HttpPost]
        public String ExamplePost()
        {
            return "Post";
        }
    }
}
