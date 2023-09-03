using Galerija.Models;
using Microsoft.AspNetCore.Mvc;
namespace Galerija.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AlbumController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var lista = new List<Album>()
            {
                new (){Naslov="Prvi"},
                new (){Naslov="Drugi"}
            };
            return new JsonResult(lista);
        }

        [HttpPost]
        public IActionResult Post(Album album)
        {
            // dodavanje u bazu
            return Created("/api/v1/Album", album); // 201
        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Album album)
        {
            // promjena u bazi
            return StatusCode(StatusCodes.Status200OK, album);
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
