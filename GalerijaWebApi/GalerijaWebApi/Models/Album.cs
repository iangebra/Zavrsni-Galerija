using System.ComponentModel.DataAnnotations;
namespace GalerijaWebApi.Models
{
    public class Album : Entitet
    {
        public string? naslov { get; set; }
        public string? opis { get; set; }

    }
}