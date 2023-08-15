using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class Komentar : Entitet
    {
        public string sadrzaj { get; set; }
        public Slika slika { get; set; }
        public DateTime datum { get; set; }
    }
}
