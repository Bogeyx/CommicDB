using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CommicDB.Utility.API
{
    public class Issue
    {
        public int Id { get; set; }

        public string APIURL { get; set; }

        public string DetailsURL { get; set; }

        public DateTime Release { get; set; }

        public int IssueNumber { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }

        public string Name { get; set; }

        public string VolumeName { get; set; }

        public int VolumeId { get; set; }

        public Issue(XElement raw)
        {
            this.Id = int.Parse(raw.Element("id").Value);
            this.APIURL = raw.Element("api_detail_url").Value + Startup.FULLAPIKEY;
            this.DetailsURL = raw.Element("site_detail_url").Value + Startup.FULLAPIKEY;
            var release = String.IsNullOrEmpty(raw.Element("store_date").Value) ? raw.Element("cover_date").Value : raw.Element("store_date").Value;
            this.Release = DateTime.Parse(release);
            this.IssueNumber = int.Parse(raw.Element("issue_number").Value);
            this.Description = raw.Element("description").Value;
            this.ImageUrl = raw.Element("image").Element("medium_url").Value;
            this.Name = raw.Element("name").Value;
            this.VolumeName = raw.Element("volume").Element("name").Value;
            this.VolumeId = int.Parse(raw.Element("volume").Element("id").Value);
        }
    }
}
