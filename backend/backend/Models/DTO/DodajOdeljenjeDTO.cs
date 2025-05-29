namespace backend.Models.DTO
{
    public class DodajOdeljenjeDTO
    {
        public int Id { get; set; }
        public string SkolskaGodina { get; set; } = "";
        public int RazredId { get; set; }
        public string Naziv { get; set; } = string.Empty;
        public string VrstaOdeljenja { get; set; } = string.Empty;
        public bool Kombinovano { get; set; }
        public bool CelodnevnaNastava { get; set; }
        public bool IzdvojenoOdeljenje { get; set; }
        public string? NazivIzdvojeneSkole { get; set; }
        public string OdeljenjskiStaresina { get; set; } = "";
        public string? Smena { get; set; }
        public string JezikNastave { get; set; } = "";
        public bool Dvojezicno { get; set; }
        public string? PrviStraniJezik { get; set; }
        public int BrojUcenika { get; set; } 
        public int BrojDecaka { get; set; }
        public int BrojDevojcica { get; set; }
    }
}
