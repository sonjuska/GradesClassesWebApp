using backend.DAL;
using backend.Models;
using backend.Models.DTO;
using backend.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.BL
{
    public class OdeljenjaBL(OdeljenjaDAL dal)
    {
        private readonly OdeljenjaDAL _dal = dal;

        public async Task<List<OdeljenjeDTO>> GetOdeljenja()
        {
            return await _dal.GetOdeljenja();
        }

        public async Task<List<OdeljenjeDTO>> GetOdeljenjaPoRazredId(int razredId)
        {
            return await _dal.GetOdeljenjaPoRazredId(razredId);
        }

        public async Task<OdeljenjeDTO?> GetOdeljenjePoId(int Id)
        {
            return await _dal.GetOdeljenjePoId(Id);
        }


        public async Task<DodajOdeljenjeDTO?> GetCeloOdeljenjePoId(int Id)
        {
            return await _dal.GetCeloOdeljenjePoId(Id);  
        }

        public async Task<AzurirajResponse> azurirajOdeljenje(int id, DodajOdeljenjeDTO dto)
        {
            return await _dal.azurirajOdeljenje(id, dto);
        }

        public async Task<DodajResponse> DodajOdeljenje(DodajOdeljenjeDTO dto)
        {
            return await _dal.DodajOdeljenje(dto);
        }

        public async Task<ObrisiResponse> ObrisiRazred(int id)
        {
            return await _dal.ObrisiRazred(id);
        }

        public async Task<OdeljenjaPaginacijaResponse<OdeljenjeDTO>> GetOdeljenjaPoRazredIdPaginacija(int razredId, int limit, int offset)
        {
            return await _dal.GetOdeljenjaPoRazredIdPaginacija(razredId, limit, offset);

        }

        public async Task<OdeljenjaPaginacijaResponse<OdeljenjeDTO>> GetOdeljenjaPaginacija(int limit, int offset)
        {
            return await _dal.GetOdeljenjaPaginacija(limit, offset);
        }
    }
}
