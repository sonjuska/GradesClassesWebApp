using backend.BL;
using backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace backend.controllers;

[ApiController]
[Route("[controller]")]
public class RazrediController(RazrediBL bl) : ControllerBase
{
    private readonly RazrediBL _bl = bl;


    [HttpGet("")]
    public async Task<ActionResult<List<RazredDTO>>> getRazredi()
    {
        return Ok(await _bl.getRazredi());
    }
    [HttpGet("paginacija")]
    public async Task<IActionResult> GetRazrediPaginacija([FromQuery] int limit = 10,
        [FromQuery] int offset = 0)
    {

        return Ok(await _bl.GetRazrediPaginacija(limit,offset));
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<RazredDTO>> getRazredPoId(int id)
    {
        var razred = await _bl.getRazredPoId(id);

        if (razred == null)
            return BadRequest();

        return Ok(razred);
    }

    [HttpPut("azuriraj/{id}")]
    public async Task<IActionResult> UpdateRazred(int id, [FromBody] RazredDTO dto)
    {
        return Ok(await _bl.UpdateRazred(id, dto));
    }

    [HttpPost("dodaj")]
    public async Task<IActionResult> DodajRazred([FromBody] RazredDTO dto)
    {
        return Ok(await _bl.DodajRazred(dto));
    }

    [HttpDelete("obrisi/{id}")]
    public async Task<IActionResult> ObrisiRazred(int id)
    {
        return Ok(await _bl.ObrisiRazred(id));
    }




}
