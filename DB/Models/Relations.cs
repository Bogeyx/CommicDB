using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using CommicDB.Utility;

namespace CommicDB.DB.Models
{
    public class ListComicRelation
    {
        public int ComicId { get; set; }
        public int ListId { get; set; }

        [NavigationProperty]
        public Comic Comic { get; set; }
        [NavigationProperty]
        public List List { get; set; }
    }

    public class TagComicRelation
    {
        public int ComicId { get; set; }
        [Required]
        public string TagName { get; set; }

        [NavigationProperty]
        public Tag Tag { get; set; }
        [NavigationProperty]
        public Comic Comic { get; set; }
    }

    public class TagListRelation
    {
        public int ListId { get; set; }
        [Required]
        public string TagName { get; set; }

        [NavigationProperty]
        public Tag Tag { get; set; }
        [NavigationProperty]
        public List List { get; set; }
    }
}
