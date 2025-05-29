namespace backend.Models.DTO
{
    public class RazredDTO
    {
        public int Id { get; set; }
        public string SkolskaGodina { get; set; } = "";
        public string RazredNaziv { get; set; } = "";
        public string Program { get; set; } = "";
        public int UkupanBrojOdeljenja { get; set; }
        public int UkupanBrojUcenika { get; set; }
    }
}
