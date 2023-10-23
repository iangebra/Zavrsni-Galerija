using GalerijaWebApi.Validations;
using System.ComponentModel.DataAnnotations;
namespace GalerijaWebApi.Models
{
    public class Album : Entitet
    {
        [NazivNeMozeBitiBroj]
        public string? naslov { get; set; }
        public string? opis { get; set; }

        public List<Slika> slike { get; set; } = new();

    }
}