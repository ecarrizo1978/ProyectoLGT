using angular2.Models;
using AngularMaterial.Models;
using angularTest.Models;
using System.Data;
using System.Data.SqlClient;



namespace angularTest.Datos
{
    public class ContactoDatos
    {
        //obtener lista de contactos desde SP
        public List<ContactoModel> Listar()
        {
            var oLista = new List<ContactoModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_Contactos", conexion);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new ContactoModel()
                        {
                            IdContacto = Convert.ToInt32(dr["IdContacto"]),
                            Nombre = dr["Nombre"].ToString(),
                            Cargo = dr["Cargo"].ToString(),
                            Telefono1 = dr["Telefono1"].ToString(),
                            Telefono2 = dr["Telefono2"].ToString(),
                            CorreoInstitucional = dr["CorreoInstitucional"].ToString(),
                            CorreoPersonal = dr["CorreoPersonal"].ToString(),
                            IdMedioContacto = Convert.ToInt32(dr["IdMedioContacto"]),
                            IdCliente = Convert.ToInt32(dr["IdCliente"]),
                            EsContactoPrincipal = Convert.ToInt32(dr["EsContactoPrincipal"]),
                            IdCargo = Convert.ToInt32(dr["idCargo"]),
                        });
                    }
                }
            }
            return oLista;
        }

        //obtener contacto by id
        public ContactoModel ObtenerContacto(int id)
        {
            var oContacto = new ContactoModel();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Obtener_Contacto", conexion);
                cmd.Parameters.AddWithValue("IdContacto", id);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oContacto.IdContacto = Convert.ToInt32(dr["IdContacto"]);
                        oContacto.Nombre = dr["Nombre"].ToString();
                        oContacto.Cargo = dr["Cargo"].ToString();
                        oContacto.Telefono1 = dr["Telefono1"].ToString();
                        oContacto.Telefono2 = dr["Telefono2"].ToString();
                        oContacto.CorreoInstitucional = dr["CorreoInstitucional"].ToString();
                        oContacto.CorreoPersonal = dr["CorreoPersonal"].ToString();
                        oContacto.IdMedioContacto = Convert.ToInt32(dr["IdMedioContacto"]);
                        oContacto.IdCliente = Convert.ToInt32(dr["IdCliente"]);
                        oContacto.IdCargo = Convert.ToInt32(dr["idCargo"]);
                    }
                }
            }
            return oContacto;
        }

        //agregar contacto
        //agregar contacto
        public int Guardar(ContactoModel contacto)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Contacto", conexion);
                    cmd.Parameters.AddWithValue("Nombre", contacto.Nombre);
                    cmd.Parameters.AddWithValue("Cargo", contacto.Cargo);
                    cmd.Parameters.AddWithValue("Telefono1", contacto.Telefono1);
                    cmd.Parameters.AddWithValue("Telefono2", contacto.Telefono2);
                    cmd.Parameters.AddWithValue("CorreoInstitucional", contacto.CorreoInstitucional);
                    cmd.Parameters.AddWithValue("CorreoPersonal", contacto.CorreoPersonal);
                    cmd.Parameters.AddWithValue("IdMedioContacto", contacto.IdMedioContacto);
                    cmd.Parameters.AddWithValue("IdCliente", contacto.IdCliente);
                    cmd.Parameters.AddWithValue("EsContactoPrincipal", contacto.EsContactoPrincipal);
                    cmd.Parameters.AddWithValue("IdCargo", contacto.IdCargo);
                    cmd.Parameters.Add("@new_identity", SqlDbType.Int, 0, "new_identity");
                    cmd.Parameters["@new_identity"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    Console.WriteLine("RowsAffected: {0}", rowsAffected);
                    int idRegistro = Convert.ToInt32(cmd.Parameters["@new_identity"].Value.ToString());
                    Console.WriteLine("Record inserted successfully. ID = " + idRegistro);

                    //retornar id registro
                    rpta = idRegistro;
                }

                return rpta;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }


        //editar los datos de un contacto
        public bool Editar(ContactoModel contacto)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Contacto", conexion);
                    cmd.Parameters.AddWithValue("IdContacto", contacto.IdContacto);
                    cmd.Parameters.AddWithValue("Nombre", contacto.Nombre);
                    cmd.Parameters.AddWithValue("Cargo", contacto.Cargo);
                    cmd.Parameters.AddWithValue("Telefono1", contacto.Telefono1);
                    cmd.Parameters.AddWithValue("Telefono2", contacto.Telefono2);
                    cmd.Parameters.AddWithValue("CorreoInstitucional", contacto.CorreoInstitucional);
                    cmd.Parameters.AddWithValue("CorreoPersonal", contacto.CorreoPersonal);
                    cmd.Parameters.AddWithValue("IdMedioContacto", contacto.IdMedioContacto);
                    cmd.Parameters.AddWithValue("IdCliente", contacto.IdCliente);
                    cmd.Parameters.AddWithValue("EsContactoPrincipal", contacto.EsContactoPrincipal);
                    cmd.Parameters.AddWithValue("IdCargo", contacto.IdCargo);
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
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Contacto", conexion);
                    cmd.Parameters.AddWithValue("IdContacto", id);
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

        //agregado para flujo de ingreso 13-09
        public List<InstitucionModel> GetInstituciones()
        {
            var oLista = new List<InstitucionModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Listar_Instituciones", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new InstitucionModel()
                            {
                                Id = Convert.ToInt32(dr["idInstitucion"]),
                                Nombre = dr["nombre"].ToString(),
                                IdComuna = Convert.ToInt32(dr["idComuna"])

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

        public List<MedioContacto> GetMediosDeContacto()
        {
            var oLista = new List<MedioContacto>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Listar_Medios_Contacto", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new MedioContacto()
                            {
                                Id = Convert.ToInt32(dr["idMedio_Contacto"]),
                                Nombre = dr["descripcion"].ToString(),

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




        //SP_Guardar_Contacto_Cliente_REL
        public bool Guardar_Institucion_Contacto_REL(string listaInstituciones, int idContacto)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Institucion_Contacto_REL", conexion);
                    cmd.Parameters.AddWithValue("@lista_ids", listaInstituciones);
                    cmd.Parameters.AddWithValue("@idContacto", idContacto);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();


                    rpta = true;
                }

                return rpta;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }

        public bool Editar_Institucion_Contacto_REL(string listaInstituciones, int idContacto)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Institucion_Contacto_REL", conexion);
                    cmd.Parameters.AddWithValue("@lista_ids", listaInstituciones);
                    cmd.Parameters.AddWithValue("@idContacto", idContacto);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();


                    rpta = true;
                }

                return rpta;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }
        public bool Borrar_Institucion_Contacto_REL(int idContacto)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Borrar_Institucion_Contacto_REL", conexion);
                    cmd.Parameters.AddWithValue("@idContacto", idContacto);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();


                    rpta = true;
                }

                return rpta;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }

        //agregado 23-09
        public List<InstitucionModel> GetInstitucionesPorIdContacto(int idContacto)
        {
            var oLista = new List<InstitucionModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Obtener_Instituciones_Por_Contacto", conexion);
                    cmd.Parameters.AddWithValue("@IdContacto", idContacto);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new InstitucionModel()
                            {
                                Id = Convert.ToInt32(dr["idInstitucion"]),
                                Nombre = dr["nombre"].ToString(),
                                IdComuna = Convert.ToInt32(dr["idComuna"])

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
