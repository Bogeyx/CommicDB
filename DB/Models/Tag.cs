using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using CommicDB.Utility;

namespace CommicDB.DB.Models
{
    public class Tag
    {
        [Key]
        public string Name { get; set; }

        [NavigationProperty]
        public List<TagListRelation> Lists { get; set; } = new List<TagListRelation>();
    }
}
