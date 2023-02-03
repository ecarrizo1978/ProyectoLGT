using System.ComponentModel.DataAnnotations;

namespace angularTest.Models
{
    public class UsuarioModel
    {
        public int IdUsuario { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Rut { get; set; }


        public string? Jefatura { get; set; }
        public string? JefaturaNombre { get; set; }


        public string Cargo { get; set; }


        public string Direccion { get; set; }


        public string Telefono { get; set; }


        public string Departamento { get; set; }
        public string? DepartamentoNombre { get; set; }

        [Required]
        public int IdRol { get; set; }
        public string? RolNombre { get; set; }

        public string CorreoCorporativo { get; set; }

        public string CorreoPersonal { get; set; }

        public string UrlFoto { get; set; }

        public string NombreFoto { get; set; }

        public string? Clave { get; set; }


        public string EsActivo { get; set; }

        [Required]
        public string FechaRegistro { get; set; }
        public string? Token { get; set; }


    }
}
