using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class ObradaKomentar
    { 
        public List<Komentar> Komentari { get; }
        public ObradaKomentar()
        {
            Komentari = new List<Komentar>();
            TestniPodaci();
        }

        private void TestniPodaci()
        {
            Komentari.Add(new Komentar
            {
                sadrzaj = "prvi komentar"

            });
            Komentari.Add(new Komentar
            {
                sadrzaj = "drugi komentar"
            });

        }

        public void PrikaziIzbornik()
        {
            Console.WriteLine("Izbornik za rad s komentarima");
            Console.WriteLine("1. Pregled postojećih komentara");
            Console.WriteLine("2. Unos novog komentara");           
            Console.WriteLine("3. Brisanje komentara");
            Console.WriteLine("4. Povratak na glavni izbornik");
            switch (Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika komentara: ",
                "Odabir mora biti 1-4", 1, 4))
            {
                case 1:
                    PregledKomentara();
                    PrikaziIzbornik();
                    break;
                case 2:
                    UcitajKomentar();
                    PrikaziIzbornik();
                    break;
                case 3:
                    if (Komentari.Count == 0)
                    {
                        Console.WriteLine("Nema komentara za brisanje");
                    }
                    else
                    {
                        BrisanjeKomentara();
                    }
                    PrikaziIzbornik();
                    break;
                case 4:
                    Console.WriteLine("Gotov rad s komentarima");
                    break;
            }
        }

        private void BrisanjeKomentara()
        {
            PregledKomentara();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj komentara za brisanje: ", "Nije dobro", 1, Komentari.Count());
            Komentari.RemoveAt(broj - 1);
        }

        public void PregledKomentara()
        {
            int b = 1;
            foreach (Komentar komentar in Komentari)
            {
                Console.WriteLine("\t{0}. {1}", b++, komentar.sadrzaj);
            }
        }

        private void UcitajKomentar()
        {
            var p = new Komentar();
            p.sadrzaj = Pomocno.UcitajString("Unesi komentar", "unos obavezan");
            Komentari.Add(p);
        }
    }
}
