using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CommicDB.DB.Models
{
    public class List
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ParentId { get; set; }
        public string Name { get; set; }

        public User User { get; set; }
        public List Parent { get; set; }
        public ICollection<List> SubLists { get; set; }
        public ICollection<ListComicRelation> Comics { get; set; }
        public ICollection<TagListRelation> Tags { get; set; }
    }
}
