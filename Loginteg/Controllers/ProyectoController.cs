using angular2.Models;
using angularTest.Datos;
using angularTest.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularMaterial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProyectoController : Controller
    {
        ProyectoDatos proyectoDatos = new ProyectoDatos();


        public IActionResult Index()
        {
            return View();
        }



        [HttpGet("[action]/{idCliente}")]
        public IEnumerable<ProyectoModel> ListarProyectos(int idCliente)
        {
            var oLista = proyectoDatos.Listar(idCliente);

            return oLista;
        }

       



        //nuevo metodo - 04-08-2022
        [HttpPost("[action]")]
        public MyResponse GuardarProyecto([FromBody] ProyectoModel oProyecto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = proyectoDatos.Guardar(oProyecto);
                //myResponse.Success = 1;
                myResponse.Success = respuesta;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpPut("[action]")]
        public MyResponse EditarProyecto([FromBody] ProyectoModel oProyecto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = proyectoDatos.Editar(oProyecto);
                myResponse.Success = 1;                
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }




        [HttpDelete("[action]/{idProyecto}")]
        public MyResponse EliminarProyecto(int idProyecto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = proyectoDatos.Eliminar(idProyecto);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

      






    

        [HttpGet("[action]/{idProyecto}")]
        public ProyectoModel ObtenerProyecto(int idProyecto)
        {
            var oLista = proyectoDatos.ObtenerProyecto(idProyecto);

            return oLista;
        }




    }
}
