using angular2.Models;
using AngularMaterial.Models;
using angularTest.Datos;
using angularTest.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularMaterial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContactoController : Controller
    {
        ContactoDatos contactoDatos = new ContactoDatos();


        public IActionResult Index()
        {
            return View();
        }



        [HttpGet("[action]")]
        public IEnumerable<ContactoModel> ListarContactos()
        {
            var oLista = contactoDatos.Listar();

            return oLista;
        }


        //nuevo metodo - 04-08-2022
        [HttpPost("[action]")]
        public MyResponse Guardar([FromBody] ContactoModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = contactoDatos.Guardar(oContacto);
                //retorna ID
                myResponse.Success = respuesta;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }


        //como webAPI
        [HttpPut("[action]/{idContacto}")]
        public MyResponse Editar([FromBody] ContactoModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = contactoDatos.Editar(oContacto);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }


        [HttpDelete("[action]/{idContacto}")]
        public MyResponse Eliminar(int idContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = contactoDatos.Eliminar(idContacto);
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
        public IEnumerable<InstitucionModel> GetInstituciones()
        {
            var oLista = contactoDatos.GetInstituciones();

            return oLista;
        }


        //nuevo ksandoval
        [HttpGet("[action]")]
        public IEnumerable<MedioContacto> GetMediosDeContacto()
        {
            var oLista = contactoDatos.GetMediosDeContacto();

            return oLista;
        }


        //para insertar en tabla intermedia Institucion 
        [HttpPost("[action]/{listaInstituciones}/{idContacto}")]
        public MyResponse Guardar_Institucion_Contacto_REL(string listaInstituciones, int idContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = contactoDatos.Guardar_Institucion_Contacto_REL(listaInstituciones, idContacto);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpPost("[action]/{listaInstituciones}/{idContacto}")]
        public MyResponse Editar_Institucion_Contacto_REL(string listaInstituciones, int idContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = contactoDatos.Editar_Institucion_Contacto_REL(listaInstituciones, idContacto);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpPost("[action]/{idContacto}")]
        public MyResponse Borrar_Institucion_Contacto_REL(int idContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = contactoDatos.Borrar_Institucion_Contacto_REL(idContacto);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }



        [HttpGet("[action]/{idContacto}")]
        public IEnumerable<InstitucionModel> GetInstitucionesPorIdContacto(int idContacto)
        {
            var oLista = contactoDatos.GetInstitucionesPorIdContacto(idContacto);

            return oLista;
        }
    }
}
