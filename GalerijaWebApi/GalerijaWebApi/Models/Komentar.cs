using System.ComponentModel.DataAnnotations.Schema;

namespace GalerijaWebApi.Models
{
    public class Komentar : Entitet
    {
        public string? sadrzaj { get; set; }
        [ForeignKey("slika")]
        public Slika? Slika { get; set; }
        public DateTime? Datum { get; set; }
    }
}