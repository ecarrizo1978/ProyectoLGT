using angular2.Models;
using angularTest.Datos;
using angularTest.Models;
using Loginteg.Helpers;
using Loginteg.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Loginteg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        UsuarioDatos usuarioDatos = new UsuarioDatos();

        private IConfiguration Configuration;
        private readonly AuthenticationSecuritySettings _securitySettings;

        public LoginController(IConfiguration _configuration, IOptions<AuthenticationSecuritySettings> securitySettings)
        {
            Configuration = _configuration;
            _securitySettings = securitySettings.Value;
        }

        [HttpPost("[action]")]
        public MyResponse LogIn([FromBody] LoginModel oLogin)
        {
            MyResponse myResponse = new MyResponse();
            try
            {
                using var sha256 = SHA256.Create();
                UsuarioModel oUsuario = new();
                oUsuario.CorreoPersonal = oLogin.CorreoPersonal;
                oUsuario.Clave = oLogin.Clave;
                var secretBytes = Encoding.UTF8.GetBytes(oUsuario.Clave);
                var secretHash = sha256.ComputeHash(secretBytes);
                oUsuario.Clave = Convert.ToHexString(secretHash);
                var respuesta = usuarioDatos.LogIn(oUsuario);
                //var respuesta = usuarioDatos.Eliminar(idUsuario);
                if (!respuesta)
                {
                    myResponse.Success = 0;
                    myResponse.Message = "usuario o contraseña inválidos";
                }
                else
                {
                    myResponse.Success = 1;
                    oUsuario = usuarioDatos.ObtenerUsuarioPorCorreo(oUsuario);
                    myResponse.Data = oUsuario;


                    var tokenHandler = new JwtSecurityTokenHandler();
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[] {
                            new Claim(JwtRegisteredClaimNames.Jti, oUsuario.IdUsuario.ToString()),
                            new Claim(JwtRegisteredClaimNames.UniqueName, oUsuario.Nombre),
                            new Claim(JwtRegisteredClaimNames.Email, oUsuario.CorreoCorporativo),
                            new Claim(ClaimTypes.Role, oUsuario.IdRol.ToString())
                        }),
                        IssuedAt = DateTime.UtcNow,
                        Expires = DateTime.UtcNow.AddMinutes(_securitySettings.TokenDurationMinutes),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_securitySettings.SecretKey)), SecurityAlgorithms.HmacSha256)
                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);

                    oUsuario.Token = tokenHandler.WriteToken(token);

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
