namespace backend.Responses
{
    public class OdeljenjaPaginacijaResponse<T>
    {
        public int Total { get; set; }
        public List<T>? Data { get; set; }
        public OdeljenjaPaginacijaResponse(int total, List<T> data)
        {
            this.Total = total;
            this.Data = data;
        }
    }
}
