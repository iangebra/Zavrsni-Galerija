using System.Text.RegularExpressions;

namespace GalerijaWebApi.Models
{
    public class Tag : Entitet
    {
        public string? naziv { get; set; }
        public ICollection<Slika> Slike { get; } = new List<Slika>();

    }
}
