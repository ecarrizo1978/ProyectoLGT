using System.ComponentModel.DataAnnotations;

namespace angularTest.Models
{
    public class TareaModel
    {
        public int IdTarea { get; set; }

        [Required]
        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        [Required]
        public int IdUsuario { get; set; }

        [Required]
        public string FechaInicio { get; set; } //campo se convierte a date en SP

        [Required]
        public string FechaTermino { get; set; } //campo se convierte a date en SP

        public string Estado { get; set; }

    }
}
