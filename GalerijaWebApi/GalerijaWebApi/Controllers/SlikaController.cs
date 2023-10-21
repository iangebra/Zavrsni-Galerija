using GalerijaWebApi.Data;
using GalerijaWebApi.Models;
using GalerijaWebApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GalerijaWebApi.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class SlikaController : ControllerBase
    {
        private readonly GalerijaContext _context;
        private readonly ILogger<SlikaController> _logger;

        /// <param name="context"></param>
        public SlikaController(GalerijaContext context,
            ILogger<SlikaController> logger)
        {
            _context = context;
            _logger = logger;
        }
        /// <summary>
        /// Dohvaća slike iz baze
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var slike = _context.Slika
                    .Include(g => g.Album)
                    .Include(g => g.Tags)
                    .Include(g => g.Lokacija)
                    .Include(g => g.Komentar)
                    .ToList();

                if (slike == null || slike.Count == 0)
                {
                    return new EmptyResult();
                }

                List<SlikaDTO> vrati = new();
                var ds = Path.DirectorySeparatorChar;
                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike" + ds);
                slike.ForEach(g =>
                {
                    var putanja = "/slike/prazno.png";
                    if (System.IO.File.Exists(dir + g.sifra + ".png"))
                    {
                        putanja = "/slike/" + g.sifra + ".png";
                    }
                    vrati.Add(new SlikaDTO()
                    {
                        Sifra = g.sifra,
                        Naslov = g.Naslov,
                        Album = g.Album.naslov,
                        Lokacija = g.Lokacija.naziv,
                        SifraAlbum = g.Album.sifra,
                        Datum = g.Datum,
                        SifraLokacija = g.Lokacija.sifra,
                        Slika = putanja


                    });
                });
                return Ok(vrati);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    ex);
            }


        }


        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetById(int sifra)
        {
            // ovdje će ići dohvaćanje u bazi


            if (sifra == 0)
            {
                return BadRequest(ModelState);
            }

            var e = _context.Slika.Include(i => i.Album)
              .FirstOrDefault(x => x.sifra == sifra);

            if (e == null)
            {
                return StatusCode(StatusCodes.Status204NoContent, e); //204
            }

            try
            {
                return new JsonResult(new SlikaDTO()
                {
                    Sifra = e.sifra,
                    Naslov = e.Naslov,
                    Datum = e.Datum,
                    SifraAlbum = e.Album == null ? 0 : e.Album.sifra,
                    Album = e.Album?.naslov
                }); //200

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message); //204
            }
        }

        /// <summary>
        /// Dodavanje slike u bazu
        /// </summary>
        [HttpPost]
        public IActionResult Post(SlikaDTO slikaDTO)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (slikaDTO.SifraAlbum <= 0)
            {
                return BadRequest(ModelState);
            }

            try
            {

                var album = _context.album.Find(slikaDTO.SifraAlbum);
                var lokacija = _context.lokacija.Find(slikaDTO.SifraLokacija);

                if (album == null)
                {
                    return BadRequest(ModelState);
                }

                Slika g = new()
                {
                    Naslov = slikaDTO.Naslov,
                    Album = album,
                    Datum = slikaDTO.Datum,
                    Lokacija = lokacija
                    

                };

                _context.Slika.Add(g);
                _context.SaveChanges();

                slikaDTO.Sifra = g.sifra;
                slikaDTO.Album = album.naslov;
                slikaDTO.Lokacija = lokacija.naziv;


                // zapisati sliku na disk
                try
                {
                    var ds = Path.DirectorySeparatorChar;




                    string dir = Path.Combine(Directory.GetCurrentDirectory()
                        + ds + "wwwroot" + ds + "slike");


                    if (!System.IO.Directory.Exists(dir))
                    {
                        System.IO.Directory.CreateDirectory(dir);
                    }


                    var putanja = Path.Combine(dir + ds + g.sifra + ".png");



                    System.IO.File.WriteAllBytes(putanja, Convert.FromBase64String(slikaDTO.Base64));

                }
                catch (Exception e)
                {

                }


                return Ok(slikaDTO);


            }
            catch (Exception ex)
            {
                return StatusCode(
                   StatusCodes.Status503ServiceUnavailable,
                   ex);
            }

        }

        /// <summary>
        /// Mijenjanje slike u bazi
        /// </summary>
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, SlikaDTO slikaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (sifra <= 0 || slikaDTO == null)
            {
                return BadRequest();
            }

            try
            {
                var album = _context.album.Find(slikaDTO.SifraAlbum);

                if (album == null)
                {
                    return BadRequest();
                }

                var lokacija = _context.lokacija.Find(slikaDTO.SifraLokacija);

                if (lokacija == null)
                {
                    return BadRequest();
                }

                var slika = _context.Slika.Find(sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                slika.Naslov = slikaDTO.Naslov;
                slika.Album = album;
                slika.Datum = slikaDTO.Datum;
                slika.Lokacija = lokacija;

                _context.Slika.Update(slika);
                _context.SaveChanges();

                slikaDTO.Sifra = sifra;
                slikaDTO.Album = album.naslov;
                slikaDTO.Lokacija = lokacija.naziv;

                return Ok(slikaDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
            }


        }


        /// <summary>
        /// Briše sliku iz baze
        /// </summary>

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return BadRequest();
            }

            var slikaBaza = _context.Slika.Find(sifra);
            if (slikaBaza == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Slika.Remove(slikaBaza);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\":\"Obrisano\"}");

            }
            catch (Exception ex)
            {

                return new JsonResult("{\"poruka\":\"Ne može se obrisati\"}");

            }
        }


        /// <summary>
        /// Tagovi na slici
        /// </summary>
        [HttpGet]
        [Route("{sifra:int}/tags")]
        public IActionResult GetTags(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var slika = _context.Slika
                    .Include(g => g.Tags)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                if (slika.Tags == null || slika.Tags.Count == 0)
                {
                    return new EmptyResult();
                }

                List<TagDTO> vrati = new();
                slika.Tags.ForEach(p =>
                {
                    vrati.Add(new TagDTO()
                    {
                        sifra = p.sifra,
                        naziv = p.naziv

                    });
                });
                return Ok(vrati);
            }
            catch (Exception ex)
            {
                return StatusCode(
                        StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
            }


        }
        /// <summary>
        /// Dodavanje taga na sliku
        /// </summary>
        [HttpPost]
        [Route("{sifra:int}/dodaj/{tagSifra:int}")]
        public IActionResult DodajTag(int sifra, int tagSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (sifra <= 0 || tagSifra <= 0)
            {
                return BadRequest();
            }

            try
            {

                var slika = _context.Slika
                    .Include(g => g.Tags)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                var tag = _context.Tag.Find(tagSifra);

                if (tag == null)
                {
                    return BadRequest();
                }



                slika.Tags.Add(tag);

                _context.Slika.Update(slika);
                _context.SaveChanges();

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);

            }

        }
        /// <summary>
        /// Brisanje taga sa slike
        /// </summary>
        [HttpDelete]
        [Route("{sifra:int}/obrisi/{tagSifra:int}")]
        public IActionResult ObrisiTag(int sifra, int tagSifra)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (sifra <= 0 || tagSifra <= 0)
            {
                return BadRequest();
            }

            try
            {

                var slika = _context.Slika
                    .Include(g => g.Tags)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                var tag = _context.Tag.Find(tagSifra);

                if (tag == null)
                {
                    return BadRequest();
                }


                slika.Tags.Remove(tag);

                _context.Slika.Update(slika);
                _context.SaveChanges();

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);

            }

        }
        /// <summary>
        /// Komentari sa pojedinacne slike
        /// </summary>
        [HttpGet]
        [Route("{sifra:int}/komentari")]
        public IActionResult GetKomentari(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (sifra <= 0)
            {
                return BadRequest();
            }

            try
            {
                var slika = _context.Slika
                    .Include(g => g.Komentar)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                if (slika.Komentar == null || slika.Komentar.Count == 0)
                {
                    return new EmptyResult();
                }

                List<KomentarDTO> vrati = new();
                slika.Komentar.ForEach(p =>
                {
                    vrati.Add(new KomentarDTO()
                    {
                        sifra = p.sifra,
                        sadrzaj = p.sadrzaj,
                        Slika = p.Slika?.Naslov,
                        Datum = p.Datum

                    });
                });
                return Ok(vrati);
            }
            catch (Exception ex)
            {
                return StatusCode(
                        StatusCodes.Status503ServiceUnavailable,
                        ex.Message);
            }


        }


        [HttpPut]
        [Route("postaviSliku/{sifra:int}")]
        public IActionResult PostaviSliku(int sifra, DodajSlikuDTO DodajSlikuDTO)
        {
            if (sifra == 0)
            {
                return BadRequest(); //400
            }

            if (DodajSlikuDTO == null || DodajSlikuDTO?.Base64?.Length == 0)
            {
                return BadRequest(); //400
            }

            var slika = _context.Slika.Find(sifra);
            if (slika == null)
            {
                return BadRequest(); //400
            }



            try
            {
                var ds = Path.DirectorySeparatorChar;




                string dir = Path.Combine(Directory.GetCurrentDirectory()
                    + ds + "wwwroot" + ds + "slike");


                if (!System.IO.Directory.Exists(dir))
                {
                    System.IO.Directory.CreateDirectory(dir);
                }


                var putanja = Path.Combine(dir + ds + sifra + ".png");



                System.IO.File.WriteAllBytes(putanja, Convert.FromBase64String(DodajSlikuDTO?.Base64));

                return new JsonResult("{\"poruka\": \"Uspješno pohranjena slika\"}");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, e.Message); //204
            }
        }


    }
}
