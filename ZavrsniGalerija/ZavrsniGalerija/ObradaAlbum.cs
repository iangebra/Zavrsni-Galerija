using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class ObradaAlbum
    {
        public List<Album> Albumi { get; }



        public ObradaAlbum()
        { 
            Albumi = new List<Album>();
            TestniPodaci();
            

        }
        public void PrikaziIzbornik()
        {
            Console.WriteLine("Izbornik za rad s albumima");
            Console.WriteLine("1. Pregled postojećih albuma");
            Console.WriteLine("2. Unos novog albuma");
            Console.WriteLine("3. Promjena postojećeg albuma");
            Console.WriteLine("4. Brisanje albuma");
            Console.WriteLine("5. Povratak na glavni izbornik");
            switch (Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika smjera: ",
                "Odabir mora biti 1-5", 1, 5))
            {
                case 1:

                    PrikaziAlbume();
                    PrikaziIzbornik();
                    break;
                case 2:
                    UnosNovogAlbuma();
                    PrikaziIzbornik();
                    break;
                case 3:
                    
                    PrikaziIzbornik();
                    break;
                case 4:
                    
                    PrikaziIzbornik();
                    break;
                case 5:
                    Console.WriteLine("Gotov rad s albumima");
                    break;
            }
        }

        private void UnosNovogAlbuma()
        {
            var s = new Album();
            s.sifra = Pomocno.ucitajCijeliBroj("unesite sifru albuma", "unos mora biti pozitivan cijeli broj");
            s.naziv = Pomocno.UcitajString("Unesite naziv albuma", "Unos obavezan");
            s.opis = Pomocno.UcitajString("Unesite opis albuma", "Unos obavezan");
            Albumi.Add(s);
        }

        private void PrikaziAlbume()
        {
            foreach(Album album in Albumi)
            {
                Console.WriteLine(album.naziv);
            }
        }
        private void TestniPodaci()
        {
            Albumi.Add(new Album { naziv="Portreti" });
            Albumi.Add(new Album { naziv = "Landscape" });
        }
    }
}

