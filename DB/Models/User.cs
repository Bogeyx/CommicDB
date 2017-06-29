using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using CommicDB.Utility;
using System.ComponentModel.DataAnnotations.Schema;

namespace CommicDB.DB.Models
{
    public class User
    {
        [Key]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public DateTime BDay { get; set; }
        public string Options { get; set; }
        [Required]
        public DateTime RegistrationDate { get; set; }

        [NotMapped]
        public string FormatedRegistrationDate
        {
            get { return this.RegistrationDate.ToString("dd.MM.yyyy"); }
        }

        [NotMapped]
        public string FormatedBDay
        {
            get { return this.BDay.ToString("dd.MM.yyyy"); }
        }

        [NavigationProperty]
        public List<List> Lists { get; set; } = new List<List>();
        [NavigationProperty]
        public List<CheckData> CheckData { get; set; } = new List<CheckData>();
    }
}
