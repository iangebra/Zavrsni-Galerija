using GalerijaWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GalerijaWebApi.Data
{
    public class GalerijaContext : DbContext
    {
        public GalerijaContext(DbContextOptions<GalerijaContext> opcije)
            : base(opcije)
        {
        }

        public DbSet<Album> album { get; set; }
    }


}

