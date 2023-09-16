using GalerijaWebApi.Data;
using GalerijaWebApi.Models;
using GalerijaWebApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;


namespace GalerijaWebApi.Controllers

{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class TagController : ControllerBase
    {

        private readonly GalerijaContext _context;

        public TagController(GalerijaContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Lista tagova
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tags = _context.Tag.ToList();
            if (tags == null || tags.Count == 0)
            {
                return new EmptyResult();
            }

            List<TagDTO> vrati = new();

            tags.ForEach(p =>
            {
                // ovo je ručno presipavanje, kasnije upogonimo automapper
                var pdto = new TagDTO()
                {
                    sifra = p.sifra,
                    naziv = p.naziv,
                };

                vrati.Add(pdto);


            });


            return Ok(vrati);

        }


        /// <summary>
        /// Dodavanje novog taga
        /// </summary>
        [HttpPost]
        public IActionResult Post(TagDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Tag p = new Tag()
                {
                    sifra = dto.sifra,
                    naziv = dto.naziv,
                };

                _context.Tag.Add(p);
                _context.SaveChanges();
                dto.sifra = p.sifra;
                return Ok(dto);

            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable, ex.Message);
            }
        }



        /// <summary>
        /// Mijenjanje tagova
        /// </summary>
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, TagDTO pdto)
        {

            if (sifra <= 0 || pdto == null)
            {
                return BadRequest();
            }

            try
            {
                var tagBaza = _context.Tag.Find(sifra);
                if (tagBaza == null)
                {
                    return BadRequest();
                }
                // inače se rade Mapper-i
                // mi ćemo za sada ručno
                tagBaza.naziv = pdto.naziv;


                _context.Tag.Update(tagBaza);
                _context.SaveChanges();
                pdto.sifra = tagBaza.sifra;
                return StatusCode(StatusCodes.Status200OK, pdto);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                  ex); // kada se vrati cijela instanca ex tada na klijentu imamo više podataka o grešci
                // nije dobro vraćati cijeli ex ali za dev je OK
            }


        }


        /// <summary>
        /// Brisanje tagova
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

            var tagBaza = _context.Tag.Find(sifra);
            if (tagBaza == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Tag.Remove(tagBaza);
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