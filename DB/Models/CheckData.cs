using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using CommicDB.Utility;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommicDB.DB.Models
{
    public class CheckData
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public int VolumeId { get; set; }

        [Required]
        public int VolumeName { get; set; }

        [Required]
        public int LastCount { get; set; }

        [Required]
        public bool HasNew { get; set; }


        [NavigationProperty]
        public User User { get; set; }
    }    
}
