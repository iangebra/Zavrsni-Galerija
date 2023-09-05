using System.ComponentModel.DataAnnotations;

namespace GalerijaWebApi.Models
{
    public abstract class Entitet
    {
        [Key]
        public int sifra { get; set; }
    }
}
