using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using CommicDB.Utility;

namespace CommicDB.DB.Models
{
    public class List
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        public int? ParentId { get; set; }
        [Required]
        public string Name { get; set; }

        [NavigationProperty]
        public User User { get; set; }
        [NavigationProperty]
        public List Parent { get; set; }
        [NavigationProperty]
        public List<List> SubLists { get; set; }
        [NavigationProperty]
        public List<ListComicRelation> Comics { get; set; }
        [NavigationProperty]
        public List<TagListRelation> Tags { get; set; }
    }
}
