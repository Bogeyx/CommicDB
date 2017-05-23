using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CommicDB.DB.Models
{
    public class ListComicRelation
    {
        public int ComicId { get; set; }
        public int ListId { get; set; }

        public Comic Comic { get; set; }
        public List List { get; set; }
    }

    public class TagComicRelation
    {
        public int ComicId { get; set; }
        public string Tag { get; set; }

        public Comic Comic { get; set; }
    }

    public class TagListRelation
    {
        public int ListId { get; set; }
        public string Tag { get; set; }

        public List List { get; set; }
    }
}
