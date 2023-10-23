namespace GalerijaWebApi.Models
{
    public class KomentarDTO : Entitet
    {
        public string? sadrzaj { get; set; }
        public string? Slika { get; set; }
        public int sifraSlika { get; set; }
        public DateTime? Datum { get; set; }

       
    }
}