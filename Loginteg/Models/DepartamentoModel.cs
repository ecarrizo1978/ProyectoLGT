namespace angular2.Models
{
    public class DepartamentoModel
    {
        //nuevo
        public int Id { get; set; }
        public string Nombre { get; set; }
        public bool esActivo { get; set; }
        public string fechaCreacion { get; set; }
        public int idJefatura { get; set; }
    }
}
