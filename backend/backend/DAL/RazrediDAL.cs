using backend.Models;
using backend.Models.DTO;
using backend.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL
{
    public class RazrediDAL
    {
        private readonly GradesClassesAppContext _context;
        public RazrediDAL(GradesClassesAppContext context)
        {
            _context = context;
        }
        public async Task<List<RazredDTO>> getRazredi()
        {
            var razredi = await _context.Razredi
                .Select(r => new RazredDTO
                {
                    Id = r.Id,
                    SkolskaGodina = r.SkolskaGodina.Vrednost,
                    RazredNaziv = r.Razred.Vrednost,
                    Program = r.Program.Vrednost,
                    UkupanBrojOdeljenja = r.UkupanBrojOdeljenja,
                    UkupanBrojUcenika = r.UkupanBrojUcenika

                })
                .ToListAsync<RazredDTO>();
            return razredi;
        }
        public async Task<RazrediPaginacijaResponse<RazredDTO>> GetRazrediPaginacija(int limit,
            int offset)
        {

            var total = await _context.Razredi.CountAsync();

            var paged = await _context.Razredi
                .Skip(offset)
                .Take(limit)
                .Select(o => new RazredDTO
                {
                    Id = o.Id,
                    SkolskaGodina = o.SkolskaGodina.Vrednost,
                    RazredNaziv = o.Razred.Vrednost,
                    Program = o.Program.Vrednost,
                    UkupanBrojOdeljenja = o.UkupanBrojOdeljenja,
                    UkupanBrojUcenika = o.UkupanBrojUcenika

                })
                .ToListAsync();

            return new RazrediPaginacijaResponse<RazredDTO>(total, paged);
        }

        public async Task<RazredDTO?> getRazredPoId(int id)
        {
            var razred = await _context.Razredi
                .Where(r => r.Id == id)
                .Select(r => new RazredDTO
                {
                    Id = r.Id,
                    SkolskaGodina = r.SkolskaGodina.Vrednost,
                    RazredNaziv = r.Razred.Vrednost,
                    Program = r.Program.Vrednost,
                    UkupanBrojOdeljenja = r.UkupanBrojOdeljenja,
                    UkupanBrojUcenika = r.UkupanBrojUcenika
                })
                .FirstOrDefaultAsync<RazredDTO>();

            return razred;
        }
        public async Task<AzurirajResponse> UpdateRazred(int id, RazredDTO dto)
        {
            var razred = await _context.Razredi.FindAsync(id);

            if (razred == null)
                return new AzurirajResponse("Id razreda za azuriranje ne postoji.");

            var skolskaGodina = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.SkolskaGodina);
            var razredNaziv = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.RazredNaziv);
            var program = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.Program);

            if (skolskaGodina == null || razredNaziv == null || program == null)
                return new AzurirajResponse("Jedna ili više šifarskih stavki nisu pronađene.");


            razred.SkolskaGodinaId = skolskaGodina.Id;
            razred.RazredId = razredNaziv.Id;
            razred.ProgramId = program.Id;
            razred.UkupanBrojOdeljenja = dto.UkupanBrojOdeljenja;
            razred.UkupanBrojUcenika = dto.UkupanBrojUcenika;
            //da nemam triger, ovde bih azurirala i DatumIzmene

            await _context.SaveChangesAsync();

            return new AzurirajResponse("Razred uspešno ažuriran.");
        }
        public async Task<DodajResponse> DodajRazred(RazredDTO dto)
        {
            var skolskaGodina = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.SkolskaGodina);
            var razredNaziv = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.RazredNaziv);
            var program = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.Program);

            if (skolskaGodina == null || razredNaziv == null || program == null)
                return new DodajResponse("Jedna ili više šifarskih stavki nisu pronađene.", -1);

            var noviRazred = new Razredi
            {
                SkolskaGodinaId = skolskaGodina.Id,
                RazredId = razredNaziv.Id,
                ProgramId = program.Id,
                UkupanBrojOdeljenja = dto.UkupanBrojOdeljenja,
                UkupanBrojUcenika = dto.UkupanBrojUcenika,
                DatumUnosa = DateTime.Now,
                DatumIzmene = DateTime.Now

            };

            _context.Razredi.Add(noviRazred);
            await _context.SaveChangesAsync();

            return new DodajResponse("Razred uspešno dodat.", noviRazred.Id);
        }
        public async Task<ObrisiResponse> ObrisiRazred(int id)
        {
            var razred = await _context.Razredi.FindAsync(id);

            if (razred == null)
            {
                return new ObrisiResponse("Razred nije pronađen.");
            }

            _context.Razredi.Remove(razred);
            await _context.SaveChangesAsync();

            return new ObrisiResponse("Razred uspešno obrisan.");
        }

    }
}
