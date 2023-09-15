namespace GalerijaWebApi.Models
{
    public class Komentar : Entitet
    {
        public string? sadrzaj { get; set; }
        public Slika? Slika { get; set; }
        public DateTime? Datum { get; set; }
    }
}
