using System.ComponentModel.DataAnnotations;

namespace angularTest.Models
{
    public class ContactoModel
    {
        public int IdContacto { get; set; }

        [Required]
        public string Nombre { get; set; }
        public string? Cargo { get; set; }

        public string? Telefono1 { get; set; }


        public string? Telefono2 { get; set; }


        public string? CorreoInstitucional { get; set; }

        public string? CorreoPersonal { get; set; }

        [Required]
        public int IdMedioContacto { get; set; }

        [Required]
        public int IdCliente { get; set; }

        [Required]
        public int EsContactoPrincipal { get; set; }
        public int IdCargo { get; set; }

    }
}
