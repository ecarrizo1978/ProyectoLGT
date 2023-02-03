using angularTest.Models;

namespace AngularMaterial.Interfaces
{
    public interface IEmailSender
    {
        void SendEmail(UsuarioModel oUsuario, string filePath, string updatePasswordLink);
    }
}
