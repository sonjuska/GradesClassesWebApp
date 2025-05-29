using backend.Models;
using backend.Models.DTO;
using backend.Responses;
using Microsoft.EntityFrameworkCore;

namespace backend.DAL
{
    public class OdeljenjaDAL
    {

        private readonly GradesClassesAppContext _context;

        public OdeljenjaDAL(GradesClassesAppContext context)
        {
            _context = context;
        }

        public async Task<List<OdeljenjeDTO>> GetOdeljenja()
        {
            var odeljenja = await _context.Odeljenja
                .Select(o => new OdeljenjeDTO
                {
                    Id = o.Id,
                    Naziv = o.Naziv,
                    OdeljenjskiStaresina = o.OdeljenjskiStaresina,
                    BrojUcenika = o.BrojUcenika,
                    IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                    JezikNastave = o.JezikNastave.Vrednost,


                })
                .ToListAsync<OdeljenjeDTO>();

            return odeljenja;
        }

        public async Task<List<OdeljenjeDTO>> GetOdeljenjaPoRazredId(int razredId)
        {
            var odeljenja = await _context.Odeljenja
                .Where(o => o.RazredId == razredId)
                .Select(o => new OdeljenjeDTO
                {
                    Id = o.Id,
                    Naziv = o.Naziv,
                    OdeljenjskiStaresina = o.OdeljenjskiStaresina,
                    BrojUcenika = o.BrojUcenika,
                    IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                    JezikNastave = o.JezikNastave.Vrednost,

                })
                .ToListAsync<OdeljenjeDTO>();

            return odeljenja;
        }

        public async Task<OdeljenjeDTO?> GetOdeljenjePoId(int Id)
        {
            var odeljenje = await _context.Odeljenja
                .Where(o => o.Id == Id)
                .Select(o => new OdeljenjeDTO
                {
                    Id = o.Id,
                    Naziv = o.Naziv,
                    OdeljenjskiStaresina = o.OdeljenjskiStaresina,
                    BrojUcenika = o.BrojUcenika,
                    IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                    JezikNastave = o.JezikNastave.Vrednost,

                })
                .FirstOrDefaultAsync<OdeljenjeDTO>();

            return odeljenje;
        }


        public async Task<DodajOdeljenjeDTO?> GetCeloOdeljenjePoId(int Id)
        {
            var odeljenje = await _context.Odeljenja
                    .Where(o => o.Id == Id)
                    .Select(o => new DodajOdeljenjeDTO
                    {
                        Id = o.Id,
                        RazredId = o.RazredId,
                        Naziv = o.Naziv,
                        VrstaOdeljenja = o.VrstaOdeljenja.Vrednost,
                        Kombinovano = o.Kombinovano,
                        CelodnevnaNastava = o.CelodnevnaNastava,
                        IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                        NazivIzdvojeneSkole = o.NazivIzdvojeneSkole != null ? o.NazivIzdvojeneSkole : null,
                        OdeljenjskiStaresina = o.OdeljenjskiStaresina,
                        Smena = o.Smena != null ? o.Smena : null,
                        JezikNastave = o.JezikNastave.Vrednost,
                        Dvojezicno = o.Dvojezicno,
                        PrviStraniJezik = o.PrviStraniJezik != null ? o.PrviStraniJezik.Vrednost : null,
                        BrojUcenika = o.BrojUcenika,
                        BrojDecaka = o.BrojDecaka,
                        BrojDevojcica = o.BrojDevojcica
                    })
                    .FirstOrDefaultAsync();

            return odeljenje;
        }

        public async Task<AzurirajResponse> azurirajOdeljenje(int id, DodajOdeljenjeDTO dto)
        {
            var odeljenje = await _context.Odeljenja.FindAsync(id);

            if (odeljenje == null)
                return new AzurirajResponse("Id odeljenja za azuriranje ne postoji.");

            var vrstaOdeljenja = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.VrstaOdeljenja);
            var jezikNastave = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.JezikNastave);
            var prviStraniJezik = !string.IsNullOrEmpty(dto.PrviStraniJezik)
                ? await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.PrviStraniJezik)
                : null;

            if (vrstaOdeljenja == null || jezikNastave == null || (dto.Dvojezicno && prviStraniJezik == null))
                return new AzurirajResponse("Jedna ili više šifarskih stavki nisu pronađene.");

            odeljenje.RazredId = dto.RazredId;
            odeljenje.Naziv = dto.Naziv;
            odeljenje.VrstaOdeljenjaId = vrstaOdeljenja.Id;
            odeljenje.Kombinovano = dto.Kombinovano;
            odeljenje.CelodnevnaNastava = dto.CelodnevnaNastava;
            odeljenje.IzdvojenoOdeljenje = dto.IzdvojenoOdeljenje;
            odeljenje.NazivIzdvojeneSkole = dto.NazivIzdvojeneSkole;
            odeljenje.OdeljenjskiStaresina = dto.OdeljenjskiStaresina;
            odeljenje.Smena = dto.Smena;
            odeljenje.JezikNastaveId = jezikNastave.Id;
            odeljenje.Dvojezicno = dto.Dvojezicno;
            odeljenje.PrviStraniJezikId = prviStraniJezik?.Id;
            odeljenje.BrojUcenika = dto.BrojUcenika;
            odeljenje.BrojDecaka = dto.BrojDecaka;
            odeljenje.BrojDevojcica = dto.BrojDevojcica;

            await _context.SaveChangesAsync();

            return new AzurirajResponse("Odeljenje uspešno ažurirano.");
        }

        public async Task<DodajResponse> DodajOdeljenje(DodajOdeljenjeDTO dto)
        {
            //nadji id u sifrarnicima, ako nema prvog stranog jezika onda ostavi null
            var jezikNastave = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.JezikNastave);
            var vrstaOdeljenja = await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.VrstaOdeljenja);
            var prviStraniJezik = string.IsNullOrWhiteSpace(dto.PrviStraniJezik)
                ? null
                : await _context.StavkeSifrarnika.FirstOrDefaultAsync(s => s.Vrednost == dto.PrviStraniJezik);

            if (jezikNastave == null || vrstaOdeljenja == null)
                return new DodajResponse("Obavezne šifarske vrednosti nisu pronađene.", -1);

            var novoOdeljenje = new Odeljenja
            {
                RazredId = dto.RazredId,
                Naziv = postaviNaNULLako(dto.Naziv),
                VrstaOdeljenjaId = vrstaOdeljenja.Id,
                Kombinovano = dto.Kombinovano,
                CelodnevnaNastava = dto.CelodnevnaNastava,
                IzdvojenoOdeljenje = dto.IzdvojenoOdeljenje,
                NazivIzdvojeneSkole = postaviNaNULLako(dto.NazivIzdvojeneSkole),
                OdeljenjskiStaresina = postaviNaNULLako(dto.OdeljenjskiStaresina),
                Smena = postaviNaNULLako(dto.Smena),
                JezikNastaveId = jezikNastave.Id,
                Dvojezicno = dto.Dvojezicno,
                PrviStraniJezikId = prviStraniJezik?.Id,
                BrojUcenika = dto.BrojUcenika,
                BrojDecaka = dto.BrojDecaka,
                BrojDevojcica = dto.BrojDevojcica,
                DatumUnosa = DateTime.Now,
                DatumIzmene = DateTime.Now
            };

            _context.Odeljenja.Add(novoOdeljenje);
            await _context.SaveChangesAsync();

            return new DodajResponse("Odeljenje uspešno dodato.", novoOdeljenje.Id);
        }

        public async Task<ObrisiResponse> ObrisiRazred(int id)
        {
            var odeljenje = await _context.Odeljenja.FindAsync(id);

            if (odeljenje == null)
            {
                return new ObrisiResponse("Odeljenje nije pronađeno.");
            }

            _context.Odeljenja.Remove(odeljenje);
            await _context.SaveChangesAsync();

            return new ObrisiResponse("Odeljenje uspešno obrisano.");
        }

        public async Task<OdeljenjaPaginacijaResponse<OdeljenjeDTO>> GetOdeljenjaPoRazredIdPaginacija( int razredId, int limit, int offset)
        {
            var query = _context.Odeljenja
                .Where(o => o.RazredId == razredId);

            var total = await query.CountAsync();

            var paged = await query
                .Skip(offset)
                .Take(limit)
                .Select(o => new OdeljenjeDTO
                {
                    Id = o.Id,
                    Naziv = o.Naziv,
                    OdeljenjskiStaresina = o.OdeljenjskiStaresina,
                    BrojUcenika = o.BrojUcenika,
                    IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                    JezikNastave = o.JezikNastave.Vrednost,
                })
                .ToListAsync();

            return new OdeljenjaPaginacijaResponse<OdeljenjeDTO>(total, paged);

        }

        public async Task<OdeljenjaPaginacijaResponse<OdeljenjeDTO>> GetOdeljenjaPaginacija(int limit, int offset)
        {
            var query = _context.Odeljenja.AsQueryable();

            var total = await query.CountAsync();

            var paged = await query
                .Skip(offset)
                .Take(limit)
                .Select(o => new OdeljenjeDTO
                {
                    Id = o.Id,
                    Naziv = o.Naziv,
                    OdeljenjskiStaresina = o.OdeljenjskiStaresina,
                    BrojUcenika = o.BrojUcenika,
                    IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                    JezikNastave = o.JezikNastave.Vrednost,
                })
                .ToListAsync();

            return new OdeljenjaPaginacijaResponse<OdeljenjeDTO>(total, paged);
        }

        // funkcija za postavljanje potrebnih polja na NULL za unos u tabelu
        private static string? postaviNaNULLako(string? value) =>
            string.IsNullOrWhiteSpace(value) ? null : value;

    }
}
