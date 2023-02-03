namespace angular2.Models
{
    public class InteraccionModel
    {
        //nuevo
        public int IdInteraccion { get; set; }
        public string NombreEmisor { get; set; }

        public string TipoSolicitud { get; set; }

        public string Solicitud { get; set; }

        public int IdUsuario { get; set; }

        public string FechaCreacion { get; set; }

        public string FechaActualizacion { get; set; }

        public string Glosa { get; set; }

        public string UrlArchivo { get; set; }

        public string NombreArchivo { get; set; }

        public int IdContacto { get; set; }

        public int IdOrdenDeTrabajo { get; set; }

    }
}
