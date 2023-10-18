namespace GalerijaWebApi.Models.DTO
{
    public class SlikaDTO
    {
        public int Sifra { get; set; }
        public string? Naslov { get; set; }
        public DateTime? Datum { get; set; }
        public string? Album { get; set; }
        public string? Lokacija { get; set; }

        public int SifraAlbum { get; set; }
        public int SifraLokacija { get; set; }

        
    }
}
