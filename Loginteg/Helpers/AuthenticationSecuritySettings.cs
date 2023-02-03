namespace Loginteg.Helpers
{
    public class AuthenticationSecuritySettings
    {
        public string SecretKey { get; set; }
        public int TokenDurationMinutes { get; set; }
    }
}
