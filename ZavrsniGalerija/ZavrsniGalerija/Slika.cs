using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class Slika : Entitet
    {
        public string naslov { get; set; }
        public DateTime datum { get; set; }
        public Album album { get; set; }
        public Lokacija lokacija { get; set; }
        public List<Tag> tagovi { get; set; }

    }
}