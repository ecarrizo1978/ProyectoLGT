using System.ComponentModel.DataAnnotations;

namespace angularTest.Models
{
    public class ProyectoModel
    {                                    
      public int idProyecto {get; set;}
      public int idCliente {get; set;}
      public string nombre {get; set;}
      public string descripcion {get; set;}
      public string fechaCreacion {get; set;}
      public int idEjecutivoComercial { get; set; }

      public string ejecutivo { get; set; }

    }
}
