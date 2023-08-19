using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZavrsniGalerija
{
    internal class ObradaSlika
    {
        public List<Slika> Slike;
        private Izbornik Izbornik;
        public ObradaSlika()

        {
            Slike = new List<Slika>();
        }
        public ObradaSlika(Izbornik izbornik):this()
        {
            this.Izbornik = izbornik;
        }
        public void PrikaziIzbornik()
        {
            Console.WriteLine("Izbornik za rad s slikama");
            Console.WriteLine("1. Pregled postojećih slika");
            Console.WriteLine("2. Unos nove slike");
            Console.WriteLine("3. Brisanje slike");
            Console.WriteLine("4. Povratak na glavni izbornik");
            switch (Pomocno.ucitajBrojRaspon("Odaberite stavku izbornika smjera: ",
                "Odabir mora biti 1-4", 1, 4))
            {
                case 1:
                    PrikaziSlike();
                    PrikaziIzbornik();
                    break;
                case 2:
                    UnosNoveSlike();
                    PrikaziIzbornik();
                    break;
                case 3:
                    if (Slike.Count == 0)
                    {
                        Console.WriteLine("Nema slika za brisanje");
                    }
                    else
                    {
                        BrisanjeSlika();
                    }
                    PrikaziIzbornik();
                    break;

                case 4:
                    Console.WriteLine("Gotov rad sa slikama");
                    break;
            }
        }

        private void BrisanjeSlika()
        {
            PrikaziSlike();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj slike za brisanje: ", "Nije dobro", 1, Slike.Count());
            Slike.RemoveAt(broj - 1);
        }

        private void PrikaziSlike()
        {
            int b = 1;
            foreach (Slika slika in Slike)
            {
                Console.WriteLine("\t {0}. {1} ({2}) {3}",b++, slika.naslov, slika.album.naziv, slika.lokacija.naziv);
                foreach(Tag tag in slika.tagovi)
                {
                    Console.WriteLine("\t\t{0}",tag);
                }
            }
        }

        private void UnosNoveSlike()
        {
            var sl = new Slika();
            sl.sifra = Pomocno.ucitajCijeliBroj("unesite sifru slike", "unos mora biti pozitivan cijeli broj");
            sl.naslov = Pomocno.UcitajString("Unesite naziv slike", "Unos obavezan");
            sl.album = UcitajAlbum();
            sl.datum = Pomocno.ucitajDatum("Unesi datum slike u formatu dd.MM.yyyy.", "Greška");
            sl.tagovi = UcitajTagove();
            sl.lokacija = UcitajLokaciju();
            Slike.Add(sl);
        }

        private List<Tag> UcitajTagove()
        {
            List<Tag> tags = new List<Tag>();
            while(Pomocno.ucitajCijeliBroj("1 za dodavanje taga","Greska") == 1)
            {
                tags.Add(UcitajTag());
            }
            return tags;
        }

        private Tag UcitajTag()
        {
            Izbornik.ObradaTag.PregledTagova();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj taga za dodavanje: ", "Nije dobro", 1, Izbornik.ObradaTag.Tags.Count());
            return Izbornik.ObradaTag.Tags[broj - 1];
        }

        private Album UcitajAlbum()
        {
            Izbornik.ObradaAlbum.PrikaziAlbume();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj albuma za promjenu: ", "Nije dobro", 1, Izbornik.ObradaAlbum.Albumi.Count());
            return Izbornik.ObradaAlbum.Albumi[broj - 1];
        }


        private Lokacija UcitajLokaciju()
        {
            Izbornik.ObradaLokacija.PrikaziLokacije();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj lokacije za promjenu: ", "Nije dobro", 1, Izbornik.ObradaLokacija.Lokacije.Count());
            return Izbornik.ObradaLokacija.Lokacije[broj - 1];
        }
    }
}
