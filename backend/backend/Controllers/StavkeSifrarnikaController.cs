using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StavkeSifrarnikaController: ControllerBase
    {
        GradesClassesAppContext _context;
        public StavkeSifrarnikaController(GradesClassesAppContext context)
        {
            _context = context;
        }
        private async Task<List<StavkaSifrarnikaDTO>> GetStavkeByCategory(string kategorija)
        {
            var stavke = await _context.StavkeSifrarnika
                .Where(s => s.Sifrarnik.Kategorija == kategorija)
                .Select(s => new StavkaSifrarnikaDTO
                {
                    Id = s.Id,
                    Vrednost = s.Vrednost
                })
                .ToListAsync();

            return stavke;
        }

        [HttpGet("skolskeGodine")]
        public async Task<ActionResult<List<StavkaSifrarnikaDTO>>> GetSkolskeGodine()
        {
            var stavke = await GetStavkeByCategory("Školska godina");
            return Ok(stavke);
        }

        [HttpGet("razredi")]
        public async Task<ActionResult<List<StavkaSifrarnikaDTO>>> GetRazredi()
        {
            var stavke = await GetStavkeByCategory("Razred");
            return Ok(stavke);
        }

        [HttpGet("vrsteOdeljenja")]
        public async Task<ActionResult<List<StavkaSifrarnikaDTO>>> GetVrsteOdeljenja()
        {
            var stavke = await GetStavkeByCategory("Vrsta odeljenja");
            return Ok(stavke);
        }

        [HttpGet("jeziciNastave")]
        public async Task<ActionResult<List<StavkaSifrarnikaDTO>>> GetJeziciNastave()
        {
            var stavke = await GetStavkeByCategory("Jezik nastave");
            return Ok(stavke);
        }

        [HttpGet("prviStraniJezici")]
        public async Task<ActionResult<List<StavkaSifrarnikaDTO>>> GetPrviStraniJezici()
        {
            var stavke = await GetStavkeByCategory("Prvi strani jezik");
            return Ok(stavke);
        }

        [HttpGet("programi")]
        public async Task<ActionResult<List<StavkaSifrarnikaDTO>>> GetProgrami()
        {
            var stavke = await GetStavkeByCategory("Program");
            return Ok(stavke);
        }
    }
}
