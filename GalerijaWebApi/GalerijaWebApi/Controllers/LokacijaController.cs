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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var lokacije = _context.lokacija.ToList();
                if (lokacije == null || lokacije.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(_context.lokacija.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                    ex.Message);
            }



        }

        [HttpPost]
        public IActionResult Post(Lokacija lokacija)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.lokacija.Add(lokacija);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, lokacija);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
            }



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
            if (sifra <= 0)
            {
                return BadRequest();
            }

            var LokacijaBaza = _context.lokacija.Find(sifra);
            if (LokacijaBaza == null)
            {
                return BadRequest();
            }

            try
            {
                _context.lokacija.Remove(LokacijaBaza);
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