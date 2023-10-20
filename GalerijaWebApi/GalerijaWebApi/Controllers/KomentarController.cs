using GalerijaWebApi.Data;
using GalerijaWebApi.Models.DTO;
using GalerijaWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GalerijaWebApi.Controllers

{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class KomentarController : ControllerBase
    {

        private readonly GalerijaContext _context;

        public KomentarController(GalerijaContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Lista svih komentara
        /// </summary>
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var komentar = _context.Komentar.Include(k=>k.Slika).ToList();
            if (komentar == null || komentar.Count == 0)
            {
                return new EmptyResult();
            }

            List<KomentarDTO> vrati = new();

            komentar.ForEach(p =>
            {
               
                var pdto = new KomentarDTO()
                {
                    sifra = p.sifra,
                    sadrzaj = p.sadrzaj,
                    Slika = p.Slika?.Naslov,
                    Datum=p.Datum
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
                var s = _context.Komentar.Find(sifra);

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
        /// Dodavanje komentara na sliku
        /// </summary>
        [HttpPost]
        public IActionResult Post(KomentarDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {

                var slika = _context.Slika.Find(dto.SifraSlika);

                if (slika == null)
                {
                    return BadRequest(ModelState);
                }


                Komentar p = new Komentar()
                {
                    sifra = dto.sifra,
                    sadrzaj = dto.sadrzaj,
                    Datum=DateTime.Now,
                    Slika=slika
                };

                _context.Komentar.Add(p);
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
        /// Brisanje komentara
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

            var komentarBaza = _context.Komentar.Find(sifra);
            if (komentarBaza == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Komentar.Remove(komentarBaza);
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
