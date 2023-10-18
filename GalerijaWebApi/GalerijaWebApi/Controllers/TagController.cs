using GalerijaWebApi.Data;
using GalerijaWebApi.Models;
using GalerijaWebApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using GalerijaWebApi.Models.DTO;
using Microsoft.EntityFrameworkCore;


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
                var s = _context.Tag.Find(sifra);

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

        [HttpGet]
        [Route("trazi/{uvjet}")]
        public IActionResult TraziTag(string uvjet)
        {
            // ovdje će ići dohvaćanje u bazi

            if (uvjet == null || uvjet.Length < 3)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var tags = _context.Tag
                    .Include(p => p.Slike)
                    .Where(p => p.naziv.Contains(uvjet))

                    // .FromSqlRaw($"SELECT a.* FROM polaznik a left join clan b on a.sifra=b.polaznik where concat(ime,' ',prezime,' ',ime) like '%@uvjet%'",
                    //             new SqlParameter("uvjet", uvjet), new SqlParameter("grupa", grupa))
                    .ToList();
                // (b.grupa is null or b.grupa!=@grupa)  and 
                List<TagDTO> vrati = new();

                tags.ForEach(s => {
                    var sdto = new TagDTO();
                    // dodati u nuget automapper ili neki drugi i skužiti kako se s njim radi, sada ručno
                    vrati.Add(new TagDTO
                    {
                        sifra = s.sifra,
                        naziv = s.naziv
                       
                    });
                });


                return new JsonResult(vrati); //200

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, e.Message); //204
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