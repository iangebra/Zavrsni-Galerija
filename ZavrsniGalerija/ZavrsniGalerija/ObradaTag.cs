using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class ObradaTag
    {
        public List<Tag> Tags {  get; }
        public ObradaTag()
        {
            Tags= new List<Tag>();
            TestniPodaci();
        }

        private void TestniPodaci()
        {
            Tags.Add(new Tag
            {
                naziv = "priroda"
            });
            Tags.Add(new Tag
            {
                naziv = "portret"
            });

        }

        public void PrikaziIzbornik()
        {
            Console.WriteLine("Izbornik za rad s tagovima");
            Console.WriteLine("1. Pregled postojećih tagova");
            Console.WriteLine("2. Unos novog taga");
            Console.WriteLine("3. Promjena postojećeg taga");
            Console.WriteLine("4. Brisanje taga");
            Console.WriteLine("5. Povratak na glavni izbornik");
            switch (Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika taga: ",
                "Odabir mora biti 1-5", 1, 5))
            {                
                case 1:
                    PregledTagova();
                    PrikaziIzbornik();
                    break;
                case 2:
                    UcitajTag();
                    PrikaziIzbornik();
                    break;
                case 3:
                    PromjenaTaga();
                    PrikaziIzbornik();
                    break;
                case 4:
                    if (Tags.Count == 0)
                    {
                        Console.WriteLine("Nema taga za brisanje");
                    }
                    else
                    {
                        BrisanjeTagova();
                    }
                    PrikaziIzbornik();
                    break;
                case 5:
                    Console.WriteLine("Gotov rad s tagovima");
                    break;
            }
        }

        private void BrisanjeTagova()
        {
            PregledTagova();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj taga za brisanje: ", "Nije dobro", 1, Tags.Count());
            Tags.RemoveAt(broj - 1);
        }

        private void PromjenaTaga()
        {

            PregledTagova();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj smjera za promjenu: ", "Nije dobro", 1, Tags.Count());
            var s = Tags[broj - 1];
            s.sifra = Pomocno.ucitajCijeliBroj("unesite sifru taga (" + s.sifra + "): ", "unos mora biti pozitivan cijeli broj");
            s.naziv = Pomocno.UcitajString("Unesite naziv albuma (" + s.naziv + "): ", "Unos obavezan");
        }

        public void PregledTagova()
        {
            int b = 1;
            foreach(Tag tag in Tags)
            {
                Console.WriteLine("\t{0}. {1}",b++,tag); 
            }
        }

        private void UcitajTag()
        {
            var p = new Tag();
            p.naziv = Pomocno.UcitajString("Unesi ime taga", "unos obavezan");
            Tags.Add(p);
        }
    }
}
