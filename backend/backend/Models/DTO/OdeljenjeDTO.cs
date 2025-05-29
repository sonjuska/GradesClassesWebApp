namespace backend.Models.DTO
{
    public class OdeljenjeDTO
    {
        public int Id { get; set; }
        public string Naziv { get; set; } = "";
        public string OdeljenjskiStaresina { get; set; } = "";
        public int BrojUcenika { get; set; }
        public bool IzdvojenoOdeljenje { get; set; }
        public string JezikNastave { get; set; } = "";
    }
}
