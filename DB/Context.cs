using System;
using System.Collections.Generic;
using System.Text;
using CommicDB.DB.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CommicDB.DB
{
    public class ComicDBContext : DbContext
    {
        public DbSet<Comic> Comics { get; set; }
        public DbSet<List> Lists { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<TagComicRelation> ComicTags { get; set; }
        public DbSet<TagListRelation> ListTags { get; set; }
        public DbSet<ListComicRelation> ListComics { get; set; }


        public ComicDBContext(DbContextOptions<ComicDBContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TagComicRelation>()
                .HasKey(c => new { c.ComicId, c.TagName });
            modelBuilder.Entity<TagListRelation>()
                .HasKey(c => new { c.ListId, c.TagName });
            modelBuilder.Entity<ListComicRelation>()
                .HasKey(c => new { c.ListId, c.ComicId });
        }

    }
}
