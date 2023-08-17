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
                
                
                case 4:
                    Console.WriteLine("Gotov rad sa slikama");
                    break;
            }
        }

        private void PrikaziSlike()
        {
            foreach (Slika slika in Slike)
            {
                Console.WriteLine("\t {0} ({1})",slika.naslov, slika.album.naziv);
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
            Slike.Add(sl);
        }

        private List<Tag> UcitajTagove()
        {
            List<Tag> tags = new List<Tag>();
            return tags;
        }

        private Album UcitajAlbum()
        {
            Izbornik.ObradaAlbum.PrikaziAlbume();
            int broj = Pomocno.ucitajBrojRaspon("Odaberi redni broj smjera za promjenu: ", "Nije dobro", 1, Izbornik.ObradaAlbum.Albumi.Count());
            return Izbornik.ObradaAlbum.Albumi[broj - 1];
        }
    }
}
