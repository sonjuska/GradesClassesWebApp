namespace backend.Responses
{
    public class ObrisiResponse
    {
        public string message { get; set; } = "";
        public ObrisiResponse(string message)
        {
            this.message = message;
        }
    }
}
