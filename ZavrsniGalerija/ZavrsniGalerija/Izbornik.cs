using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class Izbornik
    {
        private ObradaAlbum ObradaAlbum;
        public Izbornik()
        {
            ObradaAlbum = new ObradaAlbum();
            PozdravnaPoruka();
            PrikaziIzbornik();

        }

        private void PozdravnaPoruka()
        {
            Console.WriteLine("********************");
            Console.WriteLine("***** Galerija *****");
            Console.WriteLine("********************");
            PrikaziIzbornik();
        }

        private void PrikaziIzbornik()
        {
            Console.WriteLine("Glavni izbornik");
            Console.WriteLine("1. Album");
            Console.WriteLine("2. Slika");
            Console.WriteLine("3. Komentar");
            Console.WriteLine("4. Lokacija");
            Console.WriteLine("5. Tag");
            Console.WriteLine("6. Izlaz");


            switch (Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika: ",
                "Odabir mora biti 1 - 6.", 1, 6))
            {
                case 1:
                    ObradaAlbum.PrikaziIzbornik();
                    Console.WriteLine("albumi");
                    PrikaziIzbornik();
                    break;
                case 2:
                    Console.WriteLine("slike");
                    PrikaziIzbornik();
                    break;
                case 3:
                    Console.WriteLine("komentari");
                    PrikaziIzbornik();
                    break;
                case 4:
                    Console.WriteLine("lokacije");
                    PrikaziIzbornik();
                    break;
                case 5:
                    Console.WriteLine("tagovi");
                    PrikaziIzbornik();
                    break;

                case 6:
                    Console.WriteLine("Hvala na korištenju, doviđenja");
                    break;

            }


        }

    }
}