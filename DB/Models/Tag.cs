using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CommicDB.DB.Models
{
    public class Tag
    {
        [Key]
        public string Name { get; set; }

        public ICollection<TagComicRelation> Comics { get; set; }
        public ICollection<TagListRelation> Lists { get; set; }
    }
}
