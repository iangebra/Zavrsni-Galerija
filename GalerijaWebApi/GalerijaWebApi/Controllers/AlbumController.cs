using GalerijaWebApi.Data;
using GalerijaWebApi.Models;
using Microsoft.AspNetCore.Mvc;
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