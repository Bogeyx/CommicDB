using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using CommicDB.DB;

namespace CommicDB.Migrations
{
    [DbContext(typeof(ComicDBContext))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CommicDB.DB.Models.List", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<int?>("ParentId");

                    b.Property<string>("UserName")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex("UserName");

                    b.ToTable("Lists");
                });

            modelBuilder.Entity("CommicDB.DB.Models.ListComicRelation", b =>
                {
                    b.Property<int>("ListId");

                    b.Property<int>("ComicId");

                    b.HasKey("ListId", "ComicId");

                    b.ToTable("ListComics");
                });

            modelBuilder.Entity("CommicDB.DB.Models.Tag", b =>
                {
                    b.Property<string>("Name")
                        .ValueGeneratedOnAdd();

                    b.HasKey("Name");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("CommicDB.DB.Models.TagListRelation", b =>
                {
                    b.Property<int>("ListId");

                    b.Property<string>("TagName");

                    b.HasKey("ListId", "TagName");

                    b.HasIndex("TagName");

                    b.ToTable("ListTags");
                });

            modelBuilder.Entity("CommicDB.DB.Models.User", b =>
                {
                    b.Property<string>("Username")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Options");

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<DateTime>("RegistrationDate");

                    b.HasKey("Username");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CommicDB.DB.Models.List", b =>
                {
                    b.HasOne("CommicDB.DB.Models.List", "Parent")
                        .WithMany("SubLists")
                        .HasForeignKey("ParentId");

                    b.HasOne("CommicDB.DB.Models.User", "User")
                        .WithMany("Lists")
                        .HasForeignKey("UserName")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CommicDB.DB.Models.ListComicRelation", b =>
                {
                    b.HasOne("CommicDB.DB.Models.List", "List")
                        .WithMany("Comics")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CommicDB.DB.Models.TagListRelation", b =>
                {
                    b.HasOne("CommicDB.DB.Models.List", "List")
                        .WithMany("Tags")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CommicDB.DB.Models.Tag", "Tag")
                        .WithMany("Lists")
                        .HasForeignKey("TagName")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
