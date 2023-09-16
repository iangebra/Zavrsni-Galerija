﻿using GalerijaWebApi.Data;
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

        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var komentari = _context.Komentar.Include(k=>k.Slika).ToList();
            if (komentari == null || komentari.Count == 0)
            {
                return new EmptyResult();
            }

            List<KomentarDTO> vrati = new();

            komentari.ForEach(p =>
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
