﻿using GalerijaWebApi.Data;
using GalerijaWebApi.Models;
using GalerijaWebApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GalerijaWebApi.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class SlikaController : ControllerBase
    {
        private readonly GalerijaContext _context;
        private readonly ILogger<SlikaController> _logger;

        /// <param name="context"></param>
        public SlikaController(GalerijaContext context,
            ILogger<SlikaController> logger)
        {
            _context = context;
            _logger = logger;
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

                slike.ForEach(g =>
                {
                    vrati.Add(new SlikaDTO()
                    {
                        Sifra = g.sifra,
                        Naslov = g.Naslov,
                        Album = g.Album.naslov,
                        Lokacija = g.Lokacija.naziv,
                        SifraAlbum = g.Album.sifra,
                        Datum = g.Datum,
                        SifraLokacija = g.Lokacija.sifra,


                    });
                });
                return Ok(vrati);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    ex);
            }


        }


        [HttpPost]
        public IActionResult Post(SlikaDTO slikaDTO)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (slikaDTO.SifraAlbum <= 0)
            {
                return BadRequest(ModelState);
            }

            try
            {

                var album = _context.album.Find(slikaDTO.SifraAlbum);
                var lokacija = _context.lokacija.Find(slikaDTO.SifraAlbum);

                if (album == null)
                {
                    return BadRequest(ModelState);
                }

                Slika g = new()
                {
                    Naslov = slikaDTO.Naslov,
                    Album = album,
                    Datum = slikaDTO.Datum,
                    Lokacija = lokacija

                };

                _context.Slika.Add(g);
                _context.SaveChanges();

                slikaDTO.Sifra = g.sifra;
                slikaDTO.Album = album.naslov;
                slikaDTO.Lokacija = lokacija.naziv;

                return Ok(slikaDTO);


            }
            catch (Exception ex)
            {
                return StatusCode(
                   StatusCodes.Status503ServiceUnavailable,
                   ex);
            }

        }


        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, SlikaDTO slikaDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if (sifra <= 0 || slikaDTO == null)
            {
                return BadRequest();
            }

            try
            {
                var album = _context.album.Find(slikaDTO.SifraAlbum);

                if (album == null)
                {
                    return BadRequest();
                }

                var lokacija = _context.lokacija.Find(slikaDTO.SifraLokacija);

                if (lokacija == null)
                {
                    return BadRequest();
                }

                var slika = _context.Slika.Find(sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                slika.Naslov = slikaDTO.Naslov;
                slika.Album = album;
                slika.Datum = slikaDTO.Datum;
                slika.Lokacija = lokacija;

                _context.Slika.Update(slika);
                _context.SaveChanges();

                slikaDTO.Sifra = sifra;
                slikaDTO.Album = album.naslov;
                slikaDTO.Lokacija = lokacija.naziv;

                return Ok(slikaDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(
                    StatusCodes.Status503ServiceUnavailable,
                    ex.Message);
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

            var slikaBaza = _context.Slika.Find(sifra);
            if (slikaBaza == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Slika.Remove(slikaBaza);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\":\"Obrisano\"}");

            }
            catch (Exception ex)
            {

                return new JsonResult("{\"poruka\":\"Ne može se obrisati\"}");

            }
        }



        [HttpGet]
        [Route("{sifra:int}/tags")]
        public IActionResult GetTags(int sifra)
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
                var slika = _context.Slika
                    .Include(g => g.Tags)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                if (slika.Tags == null || slika.Tags.Count == 0)
                {
                    return new EmptyResult();
                }

                List<TagDTO> vrati = new();
                slika.Tags.ForEach(p =>
                {
                    vrati.Add(new TagDTO()
                    {
                        sifra = p.sifra,
                        naziv = p.naziv

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

        [HttpPost]
        [Route("{sifra:int}/dodaj/{tagSifra:int}")]
        public IActionResult DodajTag(int sifra, int tagSifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (sifra <= 0 || tagSifra <= 0)
            {
                return BadRequest();
            }

            try
            {

                var slika = _context.Slika
                    .Include(g => g.Tags)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                var tag = _context.Tag.Find(tagSifra);

                if (tag == null)
                {
                    return BadRequest();
                }



                slika.Tags.Add(tag);

                _context.Slika.Update(slika);
                _context.SaveChanges();

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);

            }

        }

        [HttpDelete]
        [Route("{sifra:int}/obrisi/{tagSifra:int}")]
        public IActionResult ObrisiTag(int sifra, int tagSifra)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (sifra <= 0 || tagSifra <= 0)
            {
                return BadRequest();
            }

            try
            {

                var slika = _context.Slika
                    .Include(g => g.Tags)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                var tag = _context.Tag.Find(tagSifra);

                if (tag == null)
                {
                    return BadRequest();
                }


                slika.Tags.Remove(tag);

                _context.Slika.Update(slika);
                _context.SaveChanges();

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(
                       StatusCodes.Status503ServiceUnavailable,
                       ex.Message);

            }

        }

        [HttpGet]
        [Route("{sifra:int}/komentari")]
        public IActionResult GetKomentari(int sifra)
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
                var slika = _context.Slika
                    .Include(g => g.Komentar)
                    .FirstOrDefault(g => g.sifra == sifra);

                if (slika == null)
                {
                    return BadRequest();
                }

                if (slika.Komentar == null || slika.Komentar.Count == 0)
                {
                    return new EmptyResult();
                }

                List<KomentarDTO> vrati = new();
                slika.Komentar.ForEach(p =>
                {
                    vrati.Add(new KomentarDTO()
                    {
                        sifra = p.sifra,
                        sadrzaj = p.sadrzaj,
                        Slika = p.Slika?.Naslov,
                        Datum=p.Datum

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


    }
}
