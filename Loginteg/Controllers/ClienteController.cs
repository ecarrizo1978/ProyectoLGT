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
    public class ClienteController : ControllerBase
    {
        ClienteDatos clienteDatos = new ClienteDatos();

        [HttpGet("ListarClientes")]
        public IEnumerable<ClienteModel> ListarClientes()
        {
            var oLista = clienteDatos.Listar();

            return oLista;
        }

        [HttpGet("[action]/{idCliente}")]
        public IEnumerable<ClienteModel> ListarClientesRelacionados(int idCliente)
        {
            var oLista = clienteDatos.ListarRelacionados(idCliente);

            return oLista;
        }



        //nuevo metodo - 04-08-2022
        [HttpPost("[action]")]
        public MyResponse GuardarCliente([FromBody] ClienteModel oCliente)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = clienteDatos.Guardar(oCliente);
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
        public MyResponse EditarCliente([FromBody] ClienteModel oCliente)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = clienteDatos.Editar(oCliente);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }




        [HttpDelete("[action]/{idCliente}")]
        public MyResponse EliminarCliente(int idCliente)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = clienteDatos.Eliminar(idCliente);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        //nuevo ksandoval
        [HttpGet("[action]")]
        public IEnumerable<RegionModel> GetRegiones()
        {
            var oLista = clienteDatos.GetRegiones();

            return oLista;
        }


        [HttpGet("[action]/{idRegion}")]
        public IEnumerable<ComunaModel> GetComunaByRegion(int idRegion)
        {
            var oLista = clienteDatos.GetComunaByRegion(idRegion);

            return oLista;
        }






        //nuevo
        [HttpPost("[action]/{idEmpresaPadre}/{empresas}")]
        public MyResponse ActualizarEmpresasRel(int idEmpresaPadre, string empresas)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = clienteDatos.ActualizarEmpresasRel(idEmpresaPadre, empresas);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }


        [HttpGet("[action]/{idCliente}")]
        public ClienteModel ObtenerCliente(int idCliente)
        {
            var oLista = clienteDatos.ObtenerCliente(idCliente);

            return oLista;
        }

        [HttpGet("[action]/{idCliente}")]
        public List<ContactoModel> ObtenerContactosPorCliente(int idCliente)
        {
            var oLista = clienteDatos.ObtenerContactoPorIdCliente(idCliente);

            return oLista;
        }

        [HttpGet("[action]/{idCliente}")]
        public List<ClienteModel> ObtenerClienteHijoPorIdPadre(int idCliente)
        {
            var oLista = clienteDatos.ObtenerClienteHijoPorIdPadre(idCliente);

            return oLista;
        }
    }
}
