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
    public class TareaController : Controller
    {

        TareaDatos tareaDatos = new TareaDatos();

        [HttpGet("[action]")]
        public IEnumerable<TareaModel> Listar()
        {
            var oLista = tareaDatos.Listar();

            return oLista;
        }


        [HttpGet("[action]/{idUsuario}")]
        public IEnumerable<TareaModel> ListarTareasPorUsuario(int idUsuario)
        {
            var oLista = tareaDatos.ListarTareasPorUsuario(idUsuario);

            return oLista;
        }

        //nuevo metodo - 04-08-2022
        [HttpPost("[action]")]
        public MyResponse Agregar([FromBody] TareaModel oTarea)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = tareaDatos.Agregar(oTarea);
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
        [HttpPut("[action]/{idTarea}")]
        public MyResponse Editar([FromBody] TareaModel oTarea)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = tareaDatos.Editar(oTarea);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }


        [HttpDelete("[action]/{idTarea}")]
        public MyResponse Eliminar(int idTarea)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = tareaDatos.Eliminar(idTarea);
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
