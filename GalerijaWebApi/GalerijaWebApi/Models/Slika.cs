using System.ComponentModel.DataAnnotations.Schema;

namespace GalerijaWebApi.Models
{
    public class Slika : Entitet
    {
        public string Naslov { get; set; }
        public DateTime? Datum { get; set; }
        [ForeignKey("album")]
        public Album? Album { get; set; }
        [ForeignKey("lokacija")]
        public Lokacija? Lokacija { get; set;}
        public List<Tag> Tags { get; set; } = new();
        public List<Komentar> Komentar { get; set; } = new();
    }
}
