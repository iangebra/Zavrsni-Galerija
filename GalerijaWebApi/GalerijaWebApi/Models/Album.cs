using GalerijaWebApi.Models;
namespace GalerijaWebApi.Models
{
    public class Album : Entitet
    {
        public string? Naslov { get; set; }
        public string Opis { get; set; }

    }
}