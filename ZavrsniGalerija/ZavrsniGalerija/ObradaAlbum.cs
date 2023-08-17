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
            if (Pomocno.dev)
            {
                TestniPodaci();
            }

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
                    PromjenaAlbuma();
                    PrikaziIzbornik();
                    break;
                case 4:
                    if (Albumi.Count == 0)
                    {
                        Console.WriteLine("Nema albuma za brisanje");
                    }
                    else
                    {
                        BrisanjeAlbuma();
                    }
                    PrikaziIzbornik();
                    break;
                case 5:
                    Console.WriteLine("Gotov rad s albumima");
                    break;
            }
        }

        private void BrisanjeAlbuma()
        {
            PrikaziAlbume();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj smjera za brisanje: ", "Nije dobro", 1, Albumi.Count());
           Albumi.RemoveAt(broj-1);
        }

        private void PromjenaAlbuma()
        {
            PrikaziAlbume();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj smjera za promjenu: ","Nije dobro", 1, Albumi.Count());
            var s = Albumi[broj-1];
            s.sifra = Pomocno.ucitajCijeliBroj("unesite sifru albuma (" + s.sifra + "): ", "unos mora biti pozitivan cijeli broj");
            s.naziv = Pomocno.UcitajString("Unesite naziv albuma (" + s.naziv + "): ", "Unos obavezan");
            s.opis = Pomocno.UcitajString("Unesite opis albuma (" + s.opis + "): ", "Unos obavezan");


        }

        private void UnosNovogAlbuma()
        {
            var s = new Album();
            s.sifra = Pomocno.ucitajCijeliBroj("unesite sifru albuma", "unos mora biti pozitivan cijeli broj");
            s.naziv = Pomocno.UcitajString("Unesite naziv albuma", "Unos obavezan");
            s.opis = Pomocno.UcitajString("Unesite opis albuma", "Unos obavezan");
            Albumi.Add(s);
        }

        public void PrikaziAlbume()
        {
            Console.WriteLine();
            Console.WriteLine("---------Albumi---------");
            Console.WriteLine("------------------------");
            int b = 1;
            foreach(Album album in Albumi)
            {
                Console.WriteLine("\t{0}. {1}", b++,album.naziv);
            }
            Console.WriteLine("------------------------");
        }
        private void TestniPodaci()
        {
            Albumi.Add(new Album { naziv="Portreti" });
            Albumi.Add(new Album { naziv = "Landscape" });
        }
    }
}

