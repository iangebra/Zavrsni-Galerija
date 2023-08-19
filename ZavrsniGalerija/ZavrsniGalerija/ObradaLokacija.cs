using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class ObradaLokacija
    {
        public List<Lokacija> Lokacije { get; }



        public ObradaLokacija()
        {
            Lokacije = new List<Lokacija>();
            if (Pomocno.dev)
            {
                TestniPodaci();
            }

        }
        public void PrikaziIzbornik()
        {
            Console.WriteLine("Izbornik za rad s lokacijama");
            Console.WriteLine("1. Pregled postojećih lokacija");
            Console.WriteLine("2. Unos nove lokacije");
            Console.WriteLine("3. Promjena postojeće lokacije");
            Console.WriteLine("4. Brisanje lokacije");
            Console.WriteLine("5. Povratak na glavni izbornik");
            switch (Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika smjera: ",
                "Odabir mora biti 1-5", 1, 5))
            {
                case 1:

                    PrikaziLokacije();
                    PrikaziIzbornik();
                    break;
                case 2:
                    UnosNoveLokacije();
                    PrikaziIzbornik();
                    break;
                case 3:
                    PromjenaLokacije();
                    PrikaziIzbornik();
                    break;
                case 4:
                    if (Lokacije.Count == 0)
                    {
                        Console.WriteLine("Nema lokacije za brisanje");
                    }
                    else
                    {
                        BrisanjeLokacije();
                    }
                    PrikaziIzbornik();
                    break;
                case 5:
                    Console.WriteLine("Gotov rad s lokacijama");
                    break;
            }
        }

        private void BrisanjeLokacije()
        {
            PrikaziLokacije();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj lokacije za brisanje: ", "Nije dobro", 1, Lokacije.Count());
            Lokacije.RemoveAt(broj - 1);
        }

        private void PromjenaLokacije()
        {
            PrikaziLokacije();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj smjera za promjenu: ", "Nije dobro", 1, Lokacije.Count());
            var s = Lokacije[broj - 1];
            s.sifra = Pomocno.ucitajCijeliBroj("unesite sifru lokacije (" + s.sifra + "): ", "unos mora biti pozitivan cijeli broj");
            s.naziv = Pomocno.UcitajString("Unesite naziv lokacije (" + s.naziv + "): ", "Unos obavezan");
            s.koordinate = Pomocno.UcitajString("Unesite lokacije u obliku xx.xx / yy.yy (" + s.koordinate + "): ", "Unos obavezan");


        }

        private void UnosNoveLokacije()
        {
            var s = new Lokacija();
            s.sifra = Pomocno.ucitajCijeliBroj("unesite sifru lokacije", "unos mora biti pozitivan cijeli broj");
            s.naziv = Pomocno.UcitajString("Unesite naziv lokacije", "Unos obavezan");
            s.koordinate = Pomocno.UcitajString("Unesite lokacije u obliku xx.xx / yy.yy", "Unos obavezan");
            Lokacije.Add(s);
        }

        public void PrikaziLokacije()
        {
            Console.WriteLine();
            Console.WriteLine("---------Lokacije---------");
            Console.WriteLine("------------------------");
            int b = 1;
            foreach (Lokacija lokacija in Lokacije)
            {
                Console.WriteLine("\t{0}. {1}", b++, lokacija.naziv);
            }
            Console.WriteLine("------------------------");
        }
        private void TestniPodaci()
        {
            Lokacije.Add(new Lokacija { naziv = "Osijek" });
            Lokacije.Add(new Lokacija { naziv = "Vis" });
        }
    }
}

