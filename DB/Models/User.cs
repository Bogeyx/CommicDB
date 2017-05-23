﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using CommicDB.Utility;

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
        public string Options { get; set; }
        [Required]
        public DateTime RegistrationDate { get; set; }

        [NavigationProperty]
        public List<List> Lists { get; set; }
    }
}