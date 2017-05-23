using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CommicDB.DB.Models
{
    public class Comic
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Discription { get; set; }
        public string Author { get; set; }
        public DateTime Release { get; set; }

        public ICollection<ListComicRelation> Lists { get; set; }
        public ICollection<TagComicRelation> Tags { get; set; }
    }
}
