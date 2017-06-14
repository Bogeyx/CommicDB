using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CommicDB.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View("Views/Home/Index.cshtml");
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }


        //Angular
        public IActionResult home()
        {
            return this.Index();
        }

        public IActionResult my()
        {
            return this.Index();
        }

        public IActionResult search()
        {
            return this.Index();
        }

        public IActionResult profile()
        {
            return this.Index();
        }

        public IActionResult listInfo()
        {
            return this.Index();
        }
    }
}
