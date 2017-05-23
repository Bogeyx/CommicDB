using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CommicDB.Utility;

namespace CommicDB.DB.Models
{
    public class Comic
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Discription { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public DateTime Release { get; set; }

        [NavigationProperty]
        public List<ListComicRelation> Lists { get; set; }
        [NavigationProperty]
        public List<TagComicRelation> Tags { get; set; }
    }
}
