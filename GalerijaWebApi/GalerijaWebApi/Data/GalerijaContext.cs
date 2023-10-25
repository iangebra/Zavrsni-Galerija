using GalerijaWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace GalerijaWebApi.Data
{
    public class GalerijaContext : DbContext
    {
        public GalerijaContext(DbContextOptions<GalerijaContext> opcije)
            : base(opcije)
        {
        }

        public DbSet<Album> album { get; set; }
        public DbSet<Lokacija> lokacija { get; set; }
        public DbSet<Slika> Slika { get; set; }
        public DbSet<Tag> Tag { get; set; }
        public DbSet<Komentar> Komentar { get; set; }
        public DbSet<Operater> Operater { get; set; }
        protected override void OnModelCreating(
           ModelBuilder modelBuilder)
        {
            // implementacija veze 1:n
            modelBuilder.Entity<Slika>().HasOne(g => g.Album);
            modelBuilder.Entity<Slika>().HasOne(g => g.Lokacija);
            modelBuilder.Entity<Komentar>().HasOne(g => g.Slika);

            // implementacjia veze n:n
            modelBuilder.Entity<Slika>()
               .HasMany(g => g.Tags)
               .WithMany(p => p.Slike)
               .UsingEntity<Dictionary<string, object>>("tag_slika",
               c => c.HasOne<Tag>().WithMany().HasForeignKey("tag"),
               c => c.HasOne<Slika>().WithMany().HasForeignKey("slika"),
               c => c.ToTable("tag_slika")
               );
        }

    }
}

