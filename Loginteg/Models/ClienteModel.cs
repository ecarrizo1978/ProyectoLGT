using System.ComponentModel.DataAnnotations;

namespace angularTest.Models
{
    public class ClienteModel
    {
        public int IdCliente { get; set; }

        [Required]
        public string RazonSocial { get; set; }

        [Required]
        public string Rut { get; set; }

        [Required]
        public int IdTipoRazonSocial { get; set; }

        [Required]
        public int IdRegion { get; set; }

        [Required]
        public int IdComuna { get; set; }

        public string Direccion { get; set; }

        public int Telefono { get; set; }

        public string NombreContacto1 { get; set; }


        public string NombreContacto2 { get; set; }


        public string Correo { get; set; }

        public string UrlFoto { get; set; }

        public string NombreFoto { get; set; }

        public int IdEmpresaPadre { get; set; }

        public string TipoEmpresaRelacionada { get; set; }

        [Required]
        public int Activo { get; set; }
        public int IdRazonSocial { get; set; }

    }
}
