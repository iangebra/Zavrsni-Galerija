using GalerijaWebApi.Data;
using GalerijaWebApi.Models;
using Microsoft.AspNetCore.Mvc;
namespace GalerijaWebApi.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class LokacijaController : ControllerBase
    {

        // Dependency injection u controller
        // https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-7.0&tabs=visual-studio#dependency-injection
        private readonly GalerijaContext _context;

        public LokacijaController(GalerijaContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Get()
        {

            return new JsonResult(_context.lokacija.ToList());
        }

        [HttpPost]
        public IActionResult Post(Lokacija Lokacija)
        {
            _context.lokacija.Add(Lokacija);
            _context.SaveChanges();

            // dodavanje u bazu
            return Created("/api/v1/Lokacija", Lokacija); // 201
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Lokacija Lokacija)
        {

            if (sifra <= 0 || Lokacija == null)
            {
                return BadRequest();
            }

            try
            {
                var LokacijaBaza = _context.lokacija.Find(sifra);
                if (LokacijaBaza == null)
                {
                    return BadRequest();
                }

                LokacijaBaza.naziv = Lokacija.naziv;
                LokacijaBaza.koordinate = Lokacija.koordinate;


                _context.lokacija.Update(LokacijaBaza);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, LokacijaBaza);

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
            // Brisanje u bazi
            return StatusCode(StatusCodes.Status200OK, "{\"obrisano\":true}");
        }

       
    }
}