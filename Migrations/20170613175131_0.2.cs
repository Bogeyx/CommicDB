using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CommicDB.Migrations
{
    public partial class _02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ListComics_Comics_ComicId",
                table: "ListComics");

            migrationBuilder.DropTable(
                name: "ComicTags");

            migrationBuilder.DropTable(
                name: "Comics");

            migrationBuilder.DropIndex(
                name: "IX_ListComics_ComicId",
                table: "ListComics");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Comics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Author = table.Column<string>(nullable: false),
                    Discription = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Release = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ComicTags",
                columns: table => new
                {
                    ComicId = table.Column<int>(nullable: false),
                    TagName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ComicTags", x => new { x.ComicId, x.TagName });
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
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ListComics_ComicId",
                table: "ListComics",
                column: "ComicId");

            migrationBuilder.CreateIndex(
                name: "IX_ComicTags_TagName",
                table: "ComicTags",
                column: "TagName");

            migrationBuilder.AddForeignKey(
                name: "FK_ListComics_Comics_ComicId",
                table: "ListComics",
                column: "ComicId",
                principalTable: "Comics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
