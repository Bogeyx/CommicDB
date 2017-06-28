using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommicDB.Utility.API
{
    public class SearchResult
    {
        public List<Issue> Issues { get; set; } = new List<Issue>();

        public List<Volume> Volumes { get; set; } = new List<Volume>();
    }
}
