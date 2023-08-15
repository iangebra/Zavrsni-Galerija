using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class Lokacija : Entitet
    {
        public string naziv { get; set; }
        public string koordinate { get; set; }
    }
}
