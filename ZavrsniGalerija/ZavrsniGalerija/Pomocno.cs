using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class Pomocno
    {
        public static bool dev;
        public static int ucitajBrojRaspon(string poruka, string greska,
            int poc, int kraj)
        {
            int b;
            while (true)
            {
                Console.Write(poruka);
                try
                {
                    b = int.Parse(Console.ReadLine());
                    if (b >= poc && b <= kraj)
                    {
                        return b;
                    }
                    Console.WriteLine(greska);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(greska);
                }
            }
        }

        internal static int ucitajCijeliBroj(string poruka, string greska)
        {
            int b;
            while (true)
            {
                Console.WriteLine(poruka);
                try
                {
                    b = int.Parse(Console.ReadLine());
                    if (b > 0)
                    {
                        return b;
                    }
                    Console.WriteLine(greska);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(greska);

                }


            }
        }

        internal static string UcitajString(string poruka, string greska)
        {
            string s = "";
            while(true)
            {
                Console.WriteLine(poruka);
                s = Console.ReadLine();
                if(s!=null && s.Trim().Length>0)
                { 
                    return s;
                }
                Console.WriteLine(greska);
            }
        }

        internal static DateTime ucitajDatum(string v1, string v2)
        {
            while (true)
            {
                try
                {
                    Console.WriteLine(v1);
                    return DateTime.Parse(Console.ReadLine());
                }
                catch (Exception ex)
                {
                    Console.WriteLine(v2);
                }

            }
        }
    }
}


