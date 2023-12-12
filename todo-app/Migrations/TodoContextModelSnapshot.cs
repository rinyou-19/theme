﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using todo_app.Models;

#nullable disable

namespace todo_app.Migrations
{
    [DbContext(typeof(TodoContext))]
    partial class TodoContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("todo_app.Models.TodoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Contents")
                        .HasColumnType("text");

                    b.Property<DateOnly>("EndOfDate")
                        .HasColumnType("date");

                    b.Property<DateOnly>("ExpectedEndOfDate")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("TodoItem");
                });
#pragma warning restore 612, 618
        }
    }
}
