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

            return new JsonResult(_context.album.ToList());
        }

        [HttpPost]        
        public IActionResult Post(Album Album)
        {
            _context.album.Add(Album);
            _context.SaveChanges();

            // dodavanje u bazu
            return Created("/api/v1/Album", Album); // 201
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Album Album)
        {
            // promjena u bazi
            return StatusCode(StatusCodes.Status200OK, Album);
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