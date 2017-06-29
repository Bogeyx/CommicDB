using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CommicDB.Utility.API
{
    public class Volume
    {
        public int Id { get; set; }

        public string APIURL { get; set; }

        public string DetailsURL { get; set; }

        public int StartYear { get; set; }

        public int IssueCount { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Name { get; set; }

        public string Puplisher { get; set; }

        public List<int> IssueIds { get; set; } = new List<int>();

        public Volume(XElement raw)
        {
            this.Id = int.Parse(raw.Element("id").Value);
            this.APIURL = raw.Element("api_detail_url").Value + Startup.FULLAPIKEY;
            this.DetailsURL = raw.Element("site_detail_url").Value + Startup.FULLAPIKEY;
            this.Description = raw.Element("description").Value;
            this.ImageUrl = raw.Element("image").Element("medium_url").Value;
            this.Name = raw.Element("name").Value;
            var startYear = String.IsNullOrEmpty(raw.Element("start_year").Value) ? "0" : raw.Element("start_year").Value;
            if(!String.IsNullOrEmpty(startYear)) 
            {
                this.StartYear = int.Parse(startYear);
            } 
            else 
            {
                this.StartYear = 0;
            }
            
            this.Puplisher = raw.Element("publisher").Element("name").Value;
            if (raw.Element("issues") != null)
            {
                raw.Element("issues").Elements("issue").ToList().ForEach(
                    e => this.IssueIds.Add(int.Parse(e.Element("id").Value))
                );
            }

            this.IssueCount = int.Parse(raw.Element("last_issue").Element("issue_number").Value);
        }
    }
}
