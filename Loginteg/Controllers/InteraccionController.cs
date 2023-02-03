using angular2.Models;
using angularTest.Datos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularMaterial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class InteraccionController : Controller
    {

        InteraccionDatos interaccionDatos = new InteraccionDatos();

        [HttpGet("[action]")]
        public IEnumerable<InteraccionModel> Listar()
        {
            var oLista = interaccionDatos.Listar();

            return oLista;
        }


        //nuevo metodo - 04-08-2022
        [HttpPost("[action]")]
        public MyResponse Agregar([FromBody] InteraccionModel oInteraccion)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = interaccionDatos.Agregar(oInteraccion);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }


        //como webAPI
        [HttpPut("[action]/{idInteraccion}")]
        public MyResponse Editar([FromBody] InteraccionModel oInteraccion)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = interaccionDatos.Editar(oInteraccion);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }


        [HttpDelete("[action]/{idInteraccion}")]
        public MyResponse Eliminar(int idInteraccion)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = interaccionDatos.Eliminar(idInteraccion);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }



    }
}
