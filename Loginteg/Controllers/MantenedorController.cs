using angularTest.Datos;
using Microsoft.AspNetCore.Mvc;
using angularTest.Models;
using System.Web;
using angular2.Models;
using Microsoft.AspNetCore.Authorization;
using Loginteg.Models;
using AngularMaterial.Models;

namespace angularTest.Controllers
{
    
    //metadata para especificar la ruta de la aplicacion
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    //[ApiController]
    // [EnableCors("MyCors")]
    public class MantenedorController : Controller
    {
        MenuDatos menuDatos = new MenuDatos();

        //parta obtener menus
        [HttpGet("[action]/{idRol}")]
        public IEnumerable<MenuModel> ListarMenus(string idRol)
        {
            var oLista = menuDatos.ListarMenus(idRol);

            return oLista;
        }

        [HttpGet("[action]/{paginaAccion}/{idRol}")]
        public int ObtenerPermisoMenuPorCliente(string paginaAccion, string idRol)
        {
            var oLista = menuDatos.ObtenerPermiso(HttpUtility.UrlDecode(paginaAccion), idRol);

            return oLista;
        }

        //parta obtener menus
        [HttpGet("[action]")]
        public IEnumerable<RolModel> ListarRoles()
        {
            var oLista = menuDatos.ListarRoles();

            return oLista;
        }

        [HttpGet("[action]")]
        public RolModel ObtenerDatosRol()
        {
            var oLista = menuDatos.ObtenerDatosRol();

            return oLista;
        }

        [HttpGet("[action]")]
        public IEnumerable<MenuModel> ListarMenusActivos()
        {
            var oLista = menuDatos.ListarMenusActivos();

            return oLista;
        }

        [HttpGet("[action]/{idRol}")]
        public string ListarRolesMenusActivos(int idRol)
        {
            var oLista = menuDatos.ListarRolesMenusActivos(idRol);

            return oLista;
        }

        //nuevo metodo - 04-08-2022
        [HttpPost("GuardarRol")]
        public MyResponse GuardarRol([FromBody] RolModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.GuardarRol(oContacto);
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

        [HttpPut("EditarRol")]
        public MyResponse EditarRol([FromBody] RolModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EditarRol(oContacto);
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

        [HttpDelete("[action]/{idRol}")]
        public MyResponse EliminarRol(int idRol)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EliminarRol(idRol);
                if (respuesta)
                {
                    myResponse.Success = 1;
                } else
                {
                    myResponse.Success = 0;
                }
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpGet("[action]")]
        public List<RazonSocialModel> ListaRazonSocial()
        {
            var oLista = menuDatos.ListarRazonSocial();

            return oLista;
        }
        [HttpGet("[action]")]
        public List<RazonSocialModel> ListaRazonSocialActiva()
        {
            var oLista = menuDatos.ListarRazonSocialActiva();

            return oLista;
        }

        [HttpPost("GuardarRazonSocial")]
        public MyResponse GuardarRazonSocial([FromBody] RazonSocialModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.GuardarRazonSocial(oContacto);
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
        [HttpGet("[action]")]
        public RazonSocialModel ObtenerDatosRazonSocial()
        {
            var oLista = menuDatos.ObtenerDatosRazonSocial();

            return oLista;
        }
        [HttpPut("EditarRazonSocial")]
        public MyResponse EditarRazonSocial([FromBody] RazonSocialModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EditarRazonSocial(oContacto);
                //retorna ID
                if (respuesta)
                {
                    myResponse.Success = 1;
                }
                else
                {
                    myResponse.Success = 0;
                }
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpDelete("[action]/{id}")]
        public MyResponse EliminarRazonSocial(int id)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EliminarRazonSocial(id);
                if (respuesta)
                {
                    myResponse.Success = 1;
                }
                else
                {
                    myResponse.Success = 0;
                }
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpGet("[action]")]
        public List<CargosModel> ListaCargos()
        {
            var oLista = menuDatos.ListarCargos();

            return oLista;
        }
        [HttpGet("[action]")]
        public List<CargosModel> ListaCargosActivos()
        {
            var oLista = menuDatos.ListaCargosActivos();

            return oLista;
        }

        [HttpPost("GuardarCargos")]
        public MyResponse GuardarCargos([FromBody] CargosModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.GuardarCargos(oContacto);
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
        [HttpGet("[action]")]
        public CargosModel ObtenerDatosCargos()
        {
            var oLista = menuDatos.ObtenerDatosCargos();

            return oLista;
        }
        [HttpPut("EditarCargos")]
        public MyResponse EditarCargos([FromBody] CargosModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EditarCargos(oContacto);
                //retorna ID
                if (respuesta)
                {
                    myResponse.Success = 1;
                }
                else
                {
                    myResponse.Success = 0;
                }
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpDelete("[action]/{id}")]
        public MyResponse EliminarCargos(int id)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EliminarCargos(id);
                if (respuesta)
                {
                    myResponse.Success = 1;
                }
                else
                {
                    myResponse.Success = 0;
                }
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }
        //Comienza Departamentos
        [HttpGet("[action]")]
        public List<DepartamentoModel> ListaDepartamentos()
        {
            var oLista = menuDatos.ListarDepartamentos();

            return oLista;
        }
        [HttpGet("[action]")]
        public List<DepartamentoModel> ListaDepartamentosActivos()
        {
            var oLista = menuDatos.ListaDepartamentosActivos();

            return oLista;
        }

        [HttpPost("GuardarDepartamentos")]
        public MyResponse GuardarDepartamentos([FromBody] DepartamentoModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.GuardarDepartamentos(oContacto);
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
        [HttpGet("[action]")]
        public DepartamentoModel ObtenerDatosDepartamentos()
        {
            var oLista = menuDatos.ObtenerDatosDepartamentos();

            return oLista;
        }
        [HttpPut("EditarDepartamentos")]
        public MyResponse EditarDepartamentos([FromBody] DepartamentoModel oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EditarDepartamentos(oContacto);
                //retorna ID
                if (respuesta)
                {
                    myResponse.Success = 1;
                }
                else
                {
                    myResponse.Success = 0;
                }
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpDelete("[action]/{id}")]
        public MyResponse EliminarDepartamentos(int id)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EliminarDepartamentos(id);
                if (respuesta)
                {
                    myResponse.Success = 1;
                }
                else
                {
                    myResponse.Success = 0;
                }
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }
        //Comienza medios de contacto
        [HttpGet("[action]")]
        public List<MedioContacto> ListaMediosContacto()
        {
            var oLista = menuDatos.ListaMediosContacto();

            return oLista;
        }
        [HttpGet("[action]")]
        public List<MedioContacto> ListaMediosContactoActivos()
        {
            var oLista = menuDatos.ListaMediosContactoActivos();

            return oLista;
        }

        [HttpPost("GuardarMediosContacto")]
        public MyResponse GuardarMediosContacto([FromBody] MedioContacto oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.GuardarMediosContacto(oContacto);
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
        [HttpGet("[action]")]
        public MedioContacto ObtenerDatosMediosContacto()
        {
            var oLista = menuDatos.ObtenerDatosMediosContacto();

            return oLista;
        }
        [HttpPut("EditarMediosContacto")]
        public MyResponse EditarMediosContacto([FromBody] MedioContacto oContacto)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EditarMediosContacto(oContacto);
                //retorna ID
                if (respuesta)
                {
                    myResponse.Success = 1;
                }
                else
                {
                    myResponse.Success = 0;
                }
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        [HttpDelete("[action]/{id}")]
        public MyResponse EliminarMediosContacto(int id)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = menuDatos.EliminarMediosContacto(id);
                if (respuesta)
                {
                    myResponse.Success = 1;
                }
                else
                {
                    myResponse.Success = 0;
                }
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
