using backend.DAL;
using backend.Models.DTO;
using backend.Responses;

namespace backend.BL
{
    public class RazrediBL
    {
        private readonly RazrediDAL _dal;

        public RazrediBL(RazrediDAL dal)
        {
            _dal = dal;
        }

        public async Task<List<RazredDTO>> getRazredi()
        {
            return await _dal.getRazredi();
        }
        public async Task<RazrediPaginacijaResponse<RazredDTO>> GetRazrediPaginacija(int limit,
            int offset)
        {
            return await _dal.GetRazrediPaginacija(limit, offset);

        }
        public async Task<RazredDTO?> getRazredPoId(int id)
        {
            return await _dal.getRazredPoId(id);

        }
        public async Task<AzurirajResponse> UpdateRazred(int id, RazredDTO dto)
        {
            return await _dal.UpdateRazred(id, dto);

        }
        public async Task<DodajResponse> DodajRazred(RazredDTO dto)
        {
            return await _dal.DodajRazred(dto);
        }
        public async Task<ObrisiResponse> ObrisiRazred(int id)
        {
            return await _dal.ObrisiRazred(id);
        }
    }
}
