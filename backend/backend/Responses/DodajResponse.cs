namespace backend.Responses
{
    public class DodajResponse
    {
        public int id {  get; set; }
        public string message { get; set; } = "";
        public DodajResponse(string message, int id)
        {
            this.id = id;
            this.message = message;
        }
    }
}
