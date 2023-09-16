namespace GalerijaWebApi.Models
{
    public class KomentarDTO : Entitet
    {
        public string? sadrzaj { get; set; }
        public Slika? Slika { get; set; }
        public DateTime? Datum { get; set; }

       
    }
}