using angular2.Models;
using AngularMaterial.Models;
using AngularMaterial.Services;
using angularTest.Datos;
using angularTest.Models;
using Loginteg.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Cryptography;
using System.Text;

namespace AngularMaterial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsuarioController : Controller
    {
        UsuarioDatos usuarioDatos = new UsuarioDatos();

        private IConfiguration Configuration;

        public UsuarioController(IConfiguration _configuration)
        {
            Configuration = _configuration;
        }


        [HttpGet("[action]")]
        public IEnumerable<UsuarioModel> ListarUsuarios()
        {
            var oLista = usuarioDatos.Listar();

            return oLista;
        }


        //nuevo metodo - 04-08-2022
        [HttpPost("[action]")]
        public MyResponse GuardarUsuario([FromBody] UsuarioModel oUsuario)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                using var sha256 = SHA256.Create();
                var secretBytes = Encoding.UTF8.GetBytes(oUsuario.Clave);
                var secretHash = sha256.ComputeHash(secretBytes);
                oUsuario.Clave = Convert.ToHexString(secretHash);
                var respuesta = usuarioDatos.Guardar(oUsuario);
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
        [HttpPut("[action]")]
        public MyResponse EditarUsuario([FromBody] UsuarioModel oUsuario)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                if(oUsuario.Clave != "") { 
                    using var sha256 = SHA256.Create();
                    var secretBytes = Encoding.UTF8.GetBytes(oUsuario.Clave);
                    var secretHash = sha256.ComputeHash(secretBytes);
                    oUsuario.Clave = Convert.ToHexString(secretHash);
                }
                var respuesta = usuarioDatos.Editar(oUsuario);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }


        [HttpDelete("[action]/{idUsuario}")]
        public MyResponse EliminarUsuario(int idUsuario)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                var respuesta = usuarioDatos.Eliminar(idUsuario);
                myResponse.Success = 1;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }

        //ksandoval 21-09 - SP_Actualizar_Password_Usuario
        [HttpPost("[action]")]
        public MyResponse ForgotSendEmailPassword([FromBody] UsuarioModel oUsuario)
        {
            MyResponse myResponse = new MyResponse();
            var FilePath = Configuration.GetSection("ForGotPassword");
            string rutaRecuperacion = FilePath.Value;

            var UpdatePasswordLink = Configuration.GetSection("UpdatePasswordLink");
            String basePath = System.AppDomain.CurrentDomain.BaseDirectory;
            basePath = basePath.Replace("bin\\Debug\\net6.0\\", "");
            string nuevaRuta = basePath + rutaRecuperacion;
            Console.WriteLine(FilePath.Value);
            string baseUrl = $"{Request.Scheme}://{Request.Headers.Where(h => h.Key == "Host").First().Value}/";
            UpdatePasswordLink.Value = baseUrl + UpdatePasswordLink.Value;

            //Ethereal Config
            var settings = new EmailConfiguration()
            {
                DisplayName = "Loginteg",
                From = "noresponder@loginteg.cl",
                SmtpServer = "smtp.gmail.com",
                Port = 465,
                UserName = "noresponder@loginteg.cl",
                Password = "qfhgyqauegkmcfwp",
                EmailIsSSL = true
            };

            IOptions<EmailConfiguration> appSettingsOptions = Options.Create(settings);
            var valuesController = new EmailSender(appSettingsOptions);

            try
            {
                oUsuario = usuarioDatos.ObtenerUsuarioPorCorreo(oUsuario);
                myResponse.Data = oUsuario;

                if (oUsuario != null)
                {

                    valuesController.SendEmail(oUsuario, nuevaRuta, UpdatePasswordLink.Value);
                    myResponse.Success = 1;
                    myResponse.Message = "ForGotPassword OK";
                }
                else
                {
                    myResponse.Success = 0;
                    myResponse.Data = oUsuario;
                }

                return myResponse;
            }
            catch (Exception ex)
            {
                myResponse.Success = 0;
                myResponse.Message = ex.Message;
            }
            return myResponse;
        }


        //ksandoval 21-09 - SP_Actualizar_Password_Usuario
        [HttpPut("[action]")]
        public MyResponse RestablecerPassword([FromBody] UsuarioModel oUsuario)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                using var sha256 = SHA256.Create();
                var secretBytes = Encoding.UTF8.GetBytes(oUsuario.Clave);
                var secretHash = sha256.ComputeHash(secretBytes);
                oUsuario.Clave = Convert.ToHexString(secretHash);
                var respuesta = usuarioDatos.RestablecerPassword(oUsuario);
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
        public IEnumerable<RolModel> GetRoles()
        {
            var oLista = usuarioDatos.GetRoles();

            return oLista;
        }


        //nuevo ksandoval
        [HttpGet("[action]")]
        public IEnumerable<JefaturaModel> GetJefaturas()
        {
            var oLista = usuarioDatos.GetJefaturas();

            return oLista;
        }


        //nuevo ksandoval
        [HttpGet("[action]")]
        public IEnumerable<DepartamentoModel> GetDepartamentos()
        {
            var oLista = usuarioDatos.GetDepartamentos();

            return oLista;
        }

        [HttpGet("[action]/{idJefatura}")]
        public IEnumerable<DepartamentoModel> GetDepartamentosPorIdJefaturas(int idJefatura)
        {
            var oLista = usuarioDatos.GetDepartamentosPorIdJefaturas(idJefatura);

            return oLista;
        }


    }
}
