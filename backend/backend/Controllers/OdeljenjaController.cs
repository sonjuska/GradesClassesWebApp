using backend.BL;
using backend.Models;
using backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace backend.controllers;

[ApiController]
[Route("[controller]")]
public class OdeljenjaController(OdeljenjaBL bl, GradesClassesAppContext context) : ControllerBase
{
    private readonly OdeljenjaBL _bl = bl;
    private readonly GradesClassesAppContext _context = context;

    [HttpGet("")]
    public async Task<ActionResult<List<OdeljenjeDTO>>> GetOdeljenja()
    {

        return Ok(await _bl.GetOdeljenja());
    }

    [HttpGet("razredi/{razredId}")]
    public async Task<ActionResult<List<OdeljenjeDTO>>> GetOdeljenjaPoRazredId(int razredId)
    {
        return Ok(await _bl.GetOdeljenjaPoRazredId(razredId));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OdeljenjeDTO>> GetOdeljenjePoId(int Id)
    {
        var odeljenje = await _bl.GetOdeljenjePoId(Id);
        if (odeljenje == null)
            return BadRequest();

        return Ok(odeljenje);
    }


    [HttpGet("celo/{id}")]
    public async Task<ActionResult<OdeljenjeDTO>> GetCeloOdeljenjePoId(int Id)
    {
        return Ok(await _bl.GetCeloOdeljenjePoId(Id));
    }


    [HttpPut("azuriraj/{id}")]
    public async Task<IActionResult> azurirajOdeljenje(int id, [FromBody] DodajOdeljenjeDTO dto)
    {
        return Ok(await _bl.azurirajOdeljenje(id, dto));
    }


    [HttpPost("dodaj")]
    public async Task<IActionResult> DodajOdeljenje([FromBody] DodajOdeljenjeDTO dto)
    {
        return Ok(await _bl.DodajOdeljenje(dto));
    }

    [HttpDelete("obrisi/{id}")]
    public async Task<IActionResult> ObrisiRazred(int id)
    {

        return Ok(await _bl.ObrisiRazred(id));
    }

    [HttpGet("razredi/{razredId}/paginacija")]
    public async Task<IActionResult> GetOdeljenjaPoRazredIdPaginacija(
    int razredId, [FromQuery] int limit = 10, [FromQuery] int offset = 0)
    {
        return Ok(await _bl.GetOdeljenjaPoRazredIdPaginacija(razredId, limit, offset));
        
    }

    [HttpGet("paginacija")]
    public async Task<IActionResult> GetOdeljenjaPaginacija([FromQuery] int limit = 10, [FromQuery] int offset = 0)
    {
        return Ok(await _bl.GetOdeljenjaPaginacija(limit, offset));
    }

    [HttpGet("exportUExcell")]
    public IActionResult ExportOdeljenja()
    {
        var odeljenja = _context.Odeljenja
            .Select(o => new ExportOdeljenjeDTO
            {
                RazredNaziv = o.Razred.Razred.Vrednost,
                Naziv = o.Naziv,
                OdeljenjskiStaresina = o.OdeljenjskiStaresina,
                BrojUcenika = o.BrojUcenika,
                IzdvojenoOdeljenje = o.IzdvojenoOdeljenje,
                JezikNastave = o.JezikNastave.Vrednost
            }).ToList();

        ExcelPackage.License.SetNonCommercialPersonal("Sonja Latinovic");
        using (var package = new ExcelPackage())
        {
            var worksheet = package.Workbook.Worksheets.Add("Odeljenja");

            // hederi
            worksheet.Cells[1, 1].Value = "RB";
            worksheet.Cells[1, 2].Value = "Razred";
            worksheet.Cells[1, 3].Value = "Naziv";
            worksheet.Cells[1, 4].Value = "Odeljenjski Starešina";
            worksheet.Cells[1, 5].Value = "Broj Učenika";
            worksheet.Cells[1, 6].Value = "Izdvojeno Odeljenje";
            worksheet.Cells[1, 7].Value = "Jezik Nastave";

            // stil hedera
            using (var range = worksheet.Cells[1, 1, 1, 7])
            {
                range.Style.Font.Bold = true;
                range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                range.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightPink);
                range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            }

            // sirina polja je sirina teksta
            for (int col = 1; col <= 7; col++)
                worksheet.Column(col).AutoFit();

            // dodaj vrednosti 
            int rb = 1;
            for (int i = 0; i < odeljenja.Count; i++)
            {
                var row = i + 2;
                worksheet.Cells[row, 1].Value = rb++;
                worksheet.Cells[row, 2].Value = odeljenja[i].RazredNaziv;
                worksheet.Cells[row, 3].Value = odeljenja[i].Naziv;
                worksheet.Cells[row, 4].Value = odeljenja[i].OdeljenjskiStaresina;
                worksheet.Cells[row, 5].Value = odeljenja[i].BrojUcenika;
                worksheet.Cells[row, 6].Value = odeljenja[i].IzdvojenoOdeljenje ? "Da" : "Ne";
                worksheet.Cells[row, 7].Value = odeljenja[i].JezikNastave;

                //svaki drugi red siv
                if ((row % 2) == 0)
                {
                    var range = worksheet.Cells[row, 1, row, 7];
                    range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightGray);
                    
                }
            }

            // Vrati podatke kao fajl preko stream-a
            var stream = new MemoryStream();
            package.SaveAs(stream);
            stream.Position = 0;

            var fileName = $"Odeljenja_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
    }

}
