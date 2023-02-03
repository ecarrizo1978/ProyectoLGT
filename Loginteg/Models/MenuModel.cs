using System.ComponentModel.DataAnnotations;

namespace angularTest.Models
{
    public class MenuModel
    {
        public int IdMenu { get; set; }

        [Required]
        public string Descripcion { get; set; }

        [Required]
        public int IdMenuPadre { get; set; }

        public string Icono { get; set; }

        [Required]
        public string Controlador { get; set; }

        public string PaginaAccion { get; set; }

        public int EsActivo { get; set; }

        public string FechaRegistro { get; set; }
        public bool isChecked { get; set; }

    }
}
