using AngularMaterial.Interfaces;
using AngularMaterial.Models;
using angularTest.Models;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace AngularMaterial.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;

        public EmailSender(IOptions<EmailConfiguration> emailConfig)
        {
            _emailConfig = emailConfig.Value;
        }

        public void SendEmail(UsuarioModel oUsuario, string filePath, string updatePasswordLink)
        {
            string cadena = oUsuario.CorreoPersonal.ToString();
            string[] palabras = cadena.Split('@');
            foreach (string palabra in palabras)
            {
                //imprimiendo los elementos
                Console.WriteLine(palabra);
            }

            System.Net.ServicePointManager.Expect100Continue = false;
            string emailSender = _emailConfig.From;
            string emailSenderPassword = _emailConfig.Password;
            string emailSenderHost = _emailConfig.SmtpServer;
            int emailSenderPort = Convert.ToInt16(_emailConfig.Port);
            Boolean emailIsSSL = Convert.ToBoolean(_emailConfig.EmailIsSSL);
            StreamReader str = new StreamReader(filePath);
            string MailText = str.ReadToEnd();
            str.Close();

            MailText = MailText.Replace("[username]", oUsuario.Nombre);
            MailText = MailText.Replace("[email]", oUsuario.CorreoPersonal);
            MailText = MailText.Replace("[link]", updatePasswordLink + "/" + oUsuario.IdUsuario.ToString() + "/" + oUsuario.CorreoPersonal);


            string subject = "Bienvenido a Loginteg";
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress(emailSender);
                mail.To.Add(oUsuario.CorreoPersonal);
                mail.Subject = subject;
                mail.Body = MailText;
                mail.IsBodyHtml = true;


                var message = new MimeMessage();
                //message.From.Add(new MailboxAddress("Joey", "joey@friends.com"));
                message.From.Add(new MailboxAddress("Equipo Loginteg", emailSender));
                message.To.Add(new MailboxAddress(oUsuario.Nombre, oUsuario.CorreoPersonal));
                message.Subject = subject;

                var bodyBuilder = new BodyBuilder();
                bodyBuilder.HtmlBody = mail.Body;
                // bodyBuilder.TextBody = "This is some plain text";

                message.Body = bodyBuilder.ToMessageBody();


                using (var client = new SmtpClient())
                {
                    client.Connect(emailSenderHost, emailSenderPort, true);
                    client.Authenticate(emailSender, emailSenderPassword);
                    client.Send(message);
                    client.Disconnect(true);
                }
                Console.WriteLine("Email enviado");

                //using (SmtpClient smtp = new SmtpClient(emailSenderHost, emailSenderPort))
                //{
                //    smtp.UseDefaultCredentials = true;
                //    smtp.Credentials = new NetworkCredential(emailSender, emailSenderPassword);
                //    smtp.EnableSsl = true;
                //    smtp.Send(mail);
                //}
            }

        }


    }
}
