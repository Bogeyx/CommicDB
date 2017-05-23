using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CommicDB.DB;
using Microsoft.AspNetCore.Mvc;

namespace CommicDB.Controllers
{
    public class DataController : Controller
    {
        private readonly ComicDBContext _comicDB;

        public DataController(ComicDBContext comicDB)
        {
            this._comicDB = comicDB;
        }

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

        [HttpGet]
        public List<String> GetTags()
        {
            return this._comicDB.Tags.Select(t => t.Name).ToList();
        }
    }
}
