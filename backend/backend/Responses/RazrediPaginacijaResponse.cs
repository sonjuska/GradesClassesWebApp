using System.Numerics;

namespace backend.Responses
{
    public class RazrediPaginacijaResponse<T>
    {
        public int Total { get; set; }
        public List<T>? Data { get; set; }
        public RazrediPaginacijaResponse(int total, List<T> data){
            this.Total = total;
            this.Data = data;
        }
    }
}
