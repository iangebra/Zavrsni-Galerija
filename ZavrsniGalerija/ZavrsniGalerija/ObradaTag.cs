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
                case 5:
                    Console.WriteLine("Gotov rad s tagovima");
                    break;
            }
        }

        private void PregledTagova()
        {
            int b = 1;
            foreach(Tag tag in Tags)
            {
                Console.WriteLine("\t{0}. {1}",b++,tag.naziv); 
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
