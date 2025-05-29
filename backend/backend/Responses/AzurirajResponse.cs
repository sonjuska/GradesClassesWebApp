namespace backend.Responses
{
    public class AzurirajResponse
    {
        public string message { get; set; } = "";
        public AzurirajResponse(string message) { 
            this.message = message;
        }
    }
}
