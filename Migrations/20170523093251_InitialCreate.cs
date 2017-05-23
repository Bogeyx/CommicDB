using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CommicDB.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Comics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Author = table.Column<string>(nullable: true),
                    Discription = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Release = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: true),
                    Options = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    RegistrationDate = table.Column<DateTime>(nullable: false),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ComicTags",
                columns: table => new
                {
                    ComicId = table.Column<int>(nullable: false),
                    Tag = table.Column<string>(nullable: false),
                    TagName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComicTags", x => new { x.ComicId, x.Tag });
                    table.ForeignKey(
                        name: "FK_ComicTags_Comics_ComicId",
                        column: x => x.ComicId,
                        principalTable: "Comics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ComicTags_Tags_TagName",
                        column: x => x.TagName,
                        principalTable: "Tags",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Lists",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    ParentId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lists", x => x.Id);
                    table.ForeignKey(
                        name: "ForeignKey_List_SubList",
                        column: x => x.ParentId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Lists_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListComics",
                columns: table => new
                {
                    ListId = table.Column<int>(nullable: false),
                    ComicId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListComics", x => new { x.ListId, x.ComicId });
                    table.ForeignKey(
                        name: "FK_ListComics_Comics_ComicId",
                        column: x => x.ComicId,
                        principalTable: "Comics",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListComics_Lists_ListId",
                        column: x => x.ListId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListTags",
                columns: table => new
                {
                    ListId = table.Column<int>(nullable: false),
                    Tag = table.Column<string>(nullable: false),
                    TagName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListTags", x => new { x.ListId, x.Tag });
                    table.ForeignKey(
                        name: "FK_ListTags_Lists_ListId",
                        column: x => x.ListId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListTags_Tags_TagName",
                        column: x => x.TagName,
                        principalTable: "Tags",
                        principalColumn: "Name",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lists_ParentId",
                table: "Lists",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Lists_UserId",
                table: "Lists",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ListComics_ComicId",
                table: "ListComics",
                column: "ComicId");

            migrationBuilder.CreateIndex(
                name: "IX_ComicTags_TagName",
                table: "ComicTags",
                column: "TagName");

            migrationBuilder.CreateIndex(
                name: "IX_ListTags_TagName",
                table: "ListTags",
                column: "TagName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ListComics");

            migrationBuilder.DropTable(
                name: "ComicTags");

            migrationBuilder.DropTable(
                name: "ListTags");

            migrationBuilder.DropTable(
                name: "Comics");

            migrationBuilder.DropTable(
                name: "Lists");

            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
