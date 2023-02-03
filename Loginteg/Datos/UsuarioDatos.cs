using angular2.Models;
using angularTest.Models;
using Loginteg.Models;
using System;
using System.Data;
using System.Data.SqlClient;



namespace angularTest.Datos
{
    public class UsuarioDatos
    {
        //obtener lista de contactos desde SP
        public List<UsuarioModel> Listar()
        {
            var oLista = new List<UsuarioModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_Usuarios", conexion);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new UsuarioModel()
                        {
                            IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                            Nombre = dr["Nombre"].ToString(),
                            Rut = dr["Rut"].ToString(),
                            Jefatura = dr["Jefatura"].ToString(),
                            JefaturaNombre = dr["JefaturaNombre"].ToString(),
                            Cargo = dr["Cargo"].ToString(),
                            Direccion = dr["Direccion"].ToString(),
                            Telefono = dr["Telefono"].ToString(),
                            Departamento = dr["Departamento"].ToString(),
                            DepartamentoNombre = dr["DepartamentoNombre"].ToString(),
                            IdRol = Convert.ToInt32(dr["IdRol"].ToString()),
                            RolNombre = dr["RolNombre"].ToString(),
                            CorreoCorporativo = dr["CorreoCorporativo"].ToString(),
                            CorreoPersonal = dr["CorreoPersonal"].ToString(),

                            UrlFoto = dr["UrlFoto"].ToString(),
                            NombreFoto = dr["NombreFoto"].ToString(),
                            Clave = dr["Clave"].ToString(),
                            EsActivo = dr["EsActivo"].ToString(),
                            FechaRegistro = dr["FechaRegistro"].ToString(),

                        });
                    }
                }
            }
            return oLista;
        }

        //obtener contacto by id
        public UsuarioModel ObtenerUsuario(int id)
        {
            var oUsuario = new UsuarioModel();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Obtener_Usuario", conexion);
                cmd.Parameters.AddWithValue("IdUsuario", id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        // oUsuario.IdUsuario = Convert.ToInt32(dr["IdUsuario"]);
                        oUsuario.Nombre = dr["Nombre"].ToString();
                        oUsuario.Rut = dr["Rut"].ToString();
                        oUsuario.Jefatura = dr["Jefatura"].ToString();
                        oUsuario.Cargo = dr["Cargo"].ToString();
                        oUsuario.Direccion = dr["Direccion"].ToString();
                        oUsuario.Telefono = dr["Telefono"].ToString();
                        oUsuario.Departamento = dr["Departamento"].ToString();
                        oUsuario.IdRol = Convert.ToInt32(dr["IdRol"].ToString());
                        oUsuario.CorreoCorporativo = dr["CorreoCorporativo"].ToString();
                        oUsuario.CorreoPersonal = dr["CorreoPersonal"].ToString();

                        oUsuario.UrlFoto = dr["UrlFoto"].ToString();
                        oUsuario.NombreFoto = dr["NombreFoto"].ToString();
                        oUsuario.Clave = dr["Clave"].ToString();
                        oUsuario.EsActivo = dr["EsActivo"].ToString();
                        oUsuario.FechaRegistro = dr["FechaRegistro"].ToString();
                    }
                }
            }
            return oUsuario;
        }

        //agregar contacto
        public bool Guardar(UsuarioModel usuario)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Usuario", conexion);
                    cmd.Parameters.AddWithValue("Nombre", usuario.Nombre);
                    cmd.Parameters.AddWithValue("Rut", usuario.Rut);
                    cmd.Parameters.AddWithValue("Jefatura", usuario.Jefatura);
                    cmd.Parameters.AddWithValue("Cargo", usuario.Cargo);
                    cmd.Parameters.AddWithValue("Direccion", usuario.Direccion);
                    cmd.Parameters.AddWithValue("Telefono", usuario.Telefono);
                    cmd.Parameters.AddWithValue("Departamento", usuario.Departamento);

                    cmd.Parameters.AddWithValue("IdRol", usuario.IdRol);
                    cmd.Parameters.AddWithValue("CorreoCorporativo", usuario.CorreoCorporativo);
                    cmd.Parameters.AddWithValue("CorreoPersonal", usuario.CorreoPersonal);
                    cmd.Parameters.AddWithValue("UrlFoto", usuario.UrlFoto);
                    cmd.Parameters.AddWithValue("NombreFoto", usuario.NombreFoto);
                    cmd.Parameters.AddWithValue("Clave", usuario.Clave);
                    cmd.Parameters.AddWithValue("EsActivo", usuario.EsActivo);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }

                rpta = true;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }


        //editar los datos de un contacto
        public bool Editar(UsuarioModel usuario)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Usuario", conexion);
                    cmd.Parameters.AddWithValue("IdUsuario", usuario.IdUsuario);
                    cmd.Parameters.AddWithValue("Nombre", usuario.Nombre);
                    cmd.Parameters.AddWithValue("Rut", usuario.Rut);
                    cmd.Parameters.AddWithValue("Jefatura", usuario.Jefatura);
                    cmd.Parameters.AddWithValue("Cargo", usuario.Cargo);
                    cmd.Parameters.AddWithValue("Direccion", usuario.Direccion);
                    cmd.Parameters.AddWithValue("Telefono", usuario.Telefono);
                    cmd.Parameters.AddWithValue("Departamento", usuario.Departamento);

                    cmd.Parameters.AddWithValue("IdRol", usuario.IdRol);
                    cmd.Parameters.AddWithValue("CorreoCorporativo", usuario.CorreoCorporativo);
                    cmd.Parameters.AddWithValue("CorreoPersonal", usuario.CorreoPersonal);
                    cmd.Parameters.AddWithValue("UrlFoto", usuario.UrlFoto);
                    cmd.Parameters.AddWithValue("NombreFoto", usuario.NombreFoto);
                    cmd.Parameters.AddWithValue("Clave", usuario.Clave);
                    cmd.Parameters.AddWithValue("EsActivo", usuario.EsActivo);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }

                rpta = true;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }

        //eliminar contacto by id
        public bool Eliminar(int id)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Usuario", conexion);
                    cmd.Parameters.AddWithValue("IdUsuario", id);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }

                rpta = true;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }

        public bool LogIn(UsuarioModel usuario)
        {
            //verificar login , debuggg
            var resp = false;
            var oUsuario = new UsuarioModel();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Login", conexion);
                cmd.Parameters.AddWithValue("@Correo", usuario.CorreoPersonal);
                cmd.Parameters.AddWithValue("@Clave", usuario.Clave);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oUsuario.IdUsuario = Convert.ToInt32(dr["IdUsuario"]);
                        oUsuario.Nombre = dr["Nombre"].ToString();
                        oUsuario.Rut = dr["Rut"].ToString();
                        oUsuario.Jefatura = dr["Jefatura"].ToString();
                        oUsuario.Cargo = dr["Cargo"].ToString();
                        oUsuario.Direccion = dr["Direccion"].ToString();
                        oUsuario.Telefono = dr["Telefono"].ToString();
                        oUsuario.Departamento = dr["Departamento"].ToString();
                        oUsuario.IdRol = Convert.ToInt32(dr["IdRol"].ToString());
                        oUsuario.CorreoCorporativo = dr["CorreoCorporativo"].ToString();
                        oUsuario.CorreoPersonal = dr["CorreoPersonal"].ToString();

                        oUsuario.UrlFoto = dr["UrlFoto"].ToString();
                        oUsuario.NombreFoto = dr["NombreFoto"].ToString();
                        oUsuario.Clave = dr["Clave"].ToString();
                        oUsuario.EsActivo = dr["EsActivo"].ToString();
                        oUsuario.FechaRegistro = dr["FechaRegistro"].ToString();

                    }

                    if (oUsuario.Clave == usuario.Clave)
                    {
                        resp = true;
                    }
                }

            }

            return resp;
        }

        public UsuarioModel ObtenerUsuarioPorCorreo(UsuarioModel usuario)
        {

            var resp = false;
            var oUsuario = new UsuarioModel();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Obtener_Usuario_Por_Correo", conexion);
                cmd.Parameters.AddWithValue("Correo", usuario.CorreoPersonal);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oUsuario.IdUsuario = Convert.ToInt32(dr["IdUsuario"]);
                        oUsuario.Nombre = dr["Nombre"].ToString();
                        oUsuario.Rut = dr["Rut"].ToString();
                        oUsuario.Jefatura = dr["Jefatura"].ToString();
                        oUsuario.Cargo = dr["Cargo"].ToString();
                        oUsuario.Direccion = dr["Direccion"].ToString();
                        oUsuario.Telefono = dr["Telefono"].ToString();
                        oUsuario.Departamento = dr["Departamento"].ToString();
                        oUsuario.IdRol = Convert.ToInt32(dr["IdRol"].ToString());
                        oUsuario.CorreoCorporativo = dr["CorreoCorporativo"].ToString();
                        oUsuario.CorreoPersonal = dr["CorreoPersonal"].ToString();

                        oUsuario.UrlFoto = dr["UrlFoto"].ToString();
                        oUsuario.NombreFoto = dr["NombreFoto"].ToString();
                        oUsuario.Clave = dr["Clave"].ToString();
                        oUsuario.EsActivo = dr["EsActivo"].ToString();
                        oUsuario.FechaRegistro = dr["FechaRegistro"].ToString();

                    }
                }

            }
            return oUsuario;

        }

        //ksandoval  SP_Actualizar_Password_Usuario
        public bool RestablecerPassword(UsuarioModel usuario)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Actualizar_Password_Usuario", conexion);
                    cmd.Parameters.AddWithValue("Correo", usuario.CorreoPersonal);
                    cmd.Parameters.AddWithValue("Password", usuario.Clave);

                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }

                rpta = true;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }

        public List<RolModel> GetRoles()
        {
            var oLista = new List<RolModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_GetRoles", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new RolModel()
                            {
                                Id = Convert.ToInt32(dr["idRol"]),
                                Descripcion = dr["descripcion"].ToString(),
                                EsActivo = Convert.ToBoolean(dr["EsActivo"]),
                                FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("MM/dd/yyyy"),

                            });
                        }
                    }
                }
                return oLista;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //30-09
        public List<JefaturaModel> GetJefaturas()
        {
            var oLista = new List<JefaturaModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Listar_Jefaturas", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new JefaturaModel()
                            {
                                id = Convert.ToInt32(dr["id"]),
                                descripcion = dr["descripcion"].ToString(),
                                esActivo = Convert.ToBoolean(dr["EsActivo"]),
                                fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy"),

                            });
                        }
                    }
                }
                return oLista;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<DepartamentoModel> GetDepartamentos()
        {
            var oLista = new List<DepartamentoModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Listar_Departamentos", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new DepartamentoModel()
                            {
                                Id = Convert.ToInt32(dr["idDepartamento"]),
                                Nombre = dr["nombre"].ToString(),

                            });
                        }
                    }
                }
                return oLista;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DepartamentoModel> GetDepartamentosPorIdJefaturas(int idJefatura)
        {
            var oLista = new List<DepartamentoModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Listar_Departamentos_Por_Jefatura", conexion);
                    cmd.Parameters.AddWithValue("idJefatura", idJefatura);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new DepartamentoModel()
                            {
                                Id = Convert.ToInt32(dr["idDepartamento"]),
                                Nombre = dr["nombre"].ToString(),

                            });
                        }
                    }
                }
                return oLista;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
