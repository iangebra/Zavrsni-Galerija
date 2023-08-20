using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class Izbornik
    {
        public ObradaAlbum ObradaAlbum { get; }
        public ObradaTag ObradaTag { get; }
        private ObradaSlika ObradaSlika;
        public ObradaLokacija ObradaLokacija { get; }
        public ObradaKomentar ObradaKomentar { get; }
        public Izbornik()
        {
            ObradaAlbum = new ObradaAlbum();
            ObradaTag = new ObradaTag();
            ObradaSlika = new ObradaSlika(this);
            ObradaLokacija = new ObradaLokacija();
            ObradaKomentar = new ObradaKomentar();

            PozdravnaPoruka();
            PrikaziIzbornik();

        }

        private void PozdravnaPoruka()
        {
            Console.WriteLine("********************");
            Console.WriteLine("***** Galerija *****");
            Console.WriteLine("********************");            
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
                    PrikaziIzbornik();
                    break;
                case 2:
                    ObradaSlika.PrikaziIzbornik();
                    PrikaziIzbornik();
                    break;
                case 3:
                    ObradaKomentar.PrikaziIzbornik();
                    PrikaziIzbornik();
                    break;
                case 4:
                    ObradaLokacija.PrikaziIzbornik();
                    PrikaziIzbornik();
                    break;
                case 5:
                    ObradaTag.PrikaziIzbornik();                   
                    PrikaziIzbornik();
                    break;

                case 6:
                    Console.WriteLine("Hvala na korištenju, doviđenja");
                    break;

            }


        }

    }
}