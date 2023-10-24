using GalerijaWebApi.Data;
using GalerijaWebApi.Models;
using GalerijaWebApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace GalerijaWebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AlbumController : ControllerBase
    {

        // Dependency injection u controller
        // https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-7.0&tabs=visual-studio#dependency-injection
        private readonly GalerijaContext _context;

        public AlbumController(GalerijaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lista albuma u bazi
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
                var albumi = _context.album.ToList();
                if (albumi == null || albumi.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(_context.album.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                    ex.Message);
            }



        }
        /// <summary>
        /// Dodavanje novog albuma
        /// </summary>
        [HttpPost]
        public IActionResult Post(Album album)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.album.Add(album);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, album);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
            }



        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {

            if (sifra <= 0)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var s = _context.album.Find(sifra);

                if (s == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, s);
                }

                return new JsonResult(s);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }

        }



        [HttpGet]
        [Route("{sifra:int}/slike")]
        public IActionResult GetSlike(int sifra)
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
                var album = _context.album
                    .Include(g => g.slike)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (album == null)
                {
                    return BadRequest();
                }

                if (album.slike == null || album.slike.Count == 0)
                {
                    return new EmptyResult();
                }

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
                album.slike.ForEach(g =>
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
                        ex.Message);
            }
        }

            /// <summary>
            /// Mijenjanje albuma u bazi
            /// </summary>
            [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Album Album)
        {

            if (sifra <= 0 || Album == null)
            {
                return BadRequest();
            }

            try
            {
                var AlbumBaza = _context.album.Find(sifra);
                if (AlbumBaza == null)
                {
                    return BadRequest();
                }

                AlbumBaza.naslov = Album.naslov;
                AlbumBaza.opis = Album.opis;


                _context.album.Update(AlbumBaza);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, AlbumBaza);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                  ex);
            }

        }
        /// <summary>
        /// Brisanje albuma
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

            var AlbumBaza = _context.album.Find(sifra);
            if (AlbumBaza == null)
            {
                return BadRequest();
            }

            try
            {
                _context.album.Remove(AlbumBaza);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\":\"Obrisano\"}");

            }
            catch (Exception ex)
            {

                return new JsonResult("{\"poruka\":\"Ne može se obrisati\"}");

            }
        }
    }
}