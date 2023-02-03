using angular2.Models;
using angularTest.Models;
using System.Data;
using System.Data.SqlClient;



namespace angularTest.Datos
{
    public class ClienteDatos
    {
        //obtener lista de contactos desde SP
        public List<ClienteModel> Listar()
        {
            var oLista = new List<ClienteModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_Clientes", conexion);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new ClienteModel()
                        {
                            IdCliente = Convert.ToInt32(dr["idCliente"]),
                            RazonSocial = dr["razonSocial"].ToString(),
                            TipoEmpresaRelacionada = dr["tipoEmpresa"].ToString(),
                            Rut = dr["rut"].ToString(),
                            UrlFoto = dr["urlFoto"].ToString(),
                            NombreFoto = dr["nombreFoto"].ToString(),
                            Direccion= dr["direccion"].ToString(),
                            Correo = dr["correo"].ToString(),
                            IdRegion = Convert.ToInt32(dr["idRegion"]),
                            IdComuna = Convert.ToInt32(dr["idComuna"]),
                            IdTipoRazonSocial = Convert.ToInt32(dr["idTipo_Cliente"]),
                            IdRazonSocial = Convert.ToInt32(dr["idRazon_Social"]),
                        });
                    }
                }
            }
            return oLista;
        }

        public List<ClienteModel> ListarRelacionados(int idCliente)
        {
            var oLista = new List<ClienteModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Obtener_Empresas_Relacionadas", conexion);
                cmd.Parameters.AddWithValue("idCliente", idCliente);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new ClienteModel()
                        {
                            IdCliente = Convert.ToInt32(dr["idCliente"]),
                            RazonSocial = dr["razonSocial"].ToString(),
                            TipoEmpresaRelacionada = dr["tipoEmpresa"].ToString(),
                            Rut = dr["rut"].ToString(),
                            UrlFoto = dr["urlFoto"].ToString(),
                            NombreFoto = dr["nombreFoto"].ToString(),
                            Direccion = dr["direccion"].ToString(),
                            Correo = dr["correo"].ToString(),
                            IdRegion = Convert.ToInt32(dr["idRegion"]),
                            IdComuna = Convert.ToInt32(dr["idComuna"]),
                            IdTipoRazonSocial = Convert.ToInt32(dr["idTipo_Cliente"]),
                        });
                    }
                }
            }
            return oLista;
        }


        //agregar contacto
        public int Guardar(ClienteModel cliente)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Cliente", conexion);
                    cmd.Parameters.AddWithValue("razonSocial", cliente.RazonSocial);
                    cmd.Parameters.AddWithValue("rut", cliente.Rut);
                    cmd.Parameters.AddWithValue("idRegion", cliente.IdRegion);
                    cmd.Parameters.AddWithValue("idComuna", cliente.IdComuna);
                    cmd.Parameters.AddWithValue("direccion", cliente.Direccion);
                    cmd.Parameters.AddWithValue("telefonoContacto", cliente.Telefono.ToString());
                    cmd.Parameters.AddWithValue("nombreContacto1", cliente.NombreContacto1);
                    cmd.Parameters.AddWithValue("nombreContacto2", cliente.NombreContacto2);
                    cmd.Parameters.AddWithValue("correo", cliente.Correo);
                    cmd.Parameters.AddWithValue("urlFoto", cliente.UrlFoto);
                    cmd.Parameters.AddWithValue("nombreFoto", cliente.NombreFoto);
                    cmd.Parameters.AddWithValue("idEmpresaPadre", cliente.IdEmpresaPadre);
                    cmd.Parameters.AddWithValue("tipoEmpresa", cliente.TipoEmpresaRelacionada);
                    cmd.Parameters.AddWithValue("activo", cliente.Activo);
                    cmd.Parameters.AddWithValue("idTipo_Cliente", cliente.IdTipoRazonSocial);
                    cmd.Parameters.AddWithValue("idRazon_Social", cliente.IdRazonSocial);
                    //cmd.Parameters.AddWithValue("@new_identity", SqlDbType.Int).Direction = ParameterDirection.Output;
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
        }

        public bool Eliminar(int id)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Cliente", conexion);
                    cmd.Parameters.AddWithValue("IdCliente", id);
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



        public List<RegionModel> GetRegiones()
        {
            var oLista = new List<RegionModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_GetRegiones", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new RegionModel()
                            {
                                Id = Convert.ToInt32(dr["idRegion"]),
                                Nombre = dr["nombre_region"].ToString(),

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




        public List<ComunaModel> GetComunaByRegion(int CodRegion)
        {
            var oLista = new List<ComunaModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_GetComunaPorRegion", conexion);
                    cmd.Parameters.AddWithValue("CodRegion", CodRegion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new ComunaModel()
                            {
                                Id = Convert.ToInt32(dr["id_comuna"]),
                                Nombre = dr["nombre_comuna"].ToString(),

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





        //agregadoo 12-09-2022 //ksandoval
        //nuevo
        public bool ActualizarEmpresasRel(int idEmpresaPadre, string empresas)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Actualizar_Empresas_Hijas", conexion);
                    cmd.Parameters.AddWithValue("@idEmpresaPadre", idEmpresaPadre);
                    cmd.Parameters.AddWithValue("@lista_id_empresas", empresas);
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


        public ClienteModel ObtenerCliente(int idCliente)
        {
            var oCliente = new ClienteModel();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Obtener_Cliente", conexion);
                    cmd.Parameters.AddWithValue("@IdCliente", idCliente);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oCliente.RazonSocial = dr["razonSocial"].ToString();
                            oCliente.Direccion = dr["direccion"].ToString();
                            oCliente.Rut = dr["rut"].ToString();
                            oCliente.NombreContacto1 = dr["nombreContacto1"].ToString();
                            oCliente.NombreContacto2 = dr["nombreContacto2"].ToString();
                            oCliente.Correo = dr["correo"].ToString();
                            oCliente.Telefono = Convert.ToInt32(dr["telefonoContacto"]);
                            oCliente.UrlFoto = dr["urlFoto"].ToString();
                            oCliente.NombreFoto = dr["nombreFoto"].ToString();
                            oCliente.TipoEmpresaRelacionada = dr["tipoEmpresa"].ToString();
                            oCliente.IdRegion = Convert.ToInt32(dr["idRegion"]);
                            oCliente.IdComuna = Convert.ToInt32(dr["idComuna"]);
                            oCliente.IdTipoRazonSocial = Convert.ToInt32(dr["idTipo_Cliente"]);
                        }
                    }
                }
                return oCliente;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool Editar(ClienteModel cliente)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Cliente", conexion);
                    cmd.Parameters.AddWithValue("idCliente", cliente.IdCliente);
                    cmd.Parameters.AddWithValue("razonSocial", cliente.RazonSocial);
                    cmd.Parameters.AddWithValue("rut", cliente.Rut);
                    cmd.Parameters.AddWithValue("idRegion", cliente.IdRegion);
                    cmd.Parameters.AddWithValue("idComuna", cliente.IdComuna);
                    cmd.Parameters.AddWithValue("direccion", cliente.Direccion);
                    cmd.Parameters.AddWithValue("telefonoContacto", cliente.Telefono.ToString());
                    cmd.Parameters.AddWithValue("nombreContacto1", cliente.NombreContacto1);
                    cmd.Parameters.AddWithValue("nombreContacto2", cliente.NombreContacto2);
                    cmd.Parameters.AddWithValue("correo", cliente.Correo);
                    cmd.Parameters.AddWithValue("urlFoto", cliente.UrlFoto);
                    cmd.Parameters.AddWithValue("nombreFoto", cliente.NombreFoto);
                    cmd.Parameters.AddWithValue("idEmpresaPadre", cliente.IdEmpresaPadre);
                    cmd.Parameters.AddWithValue("tipoEmpresa", cliente.TipoEmpresaRelacionada);
                    cmd.Parameters.AddWithValue("activo", cliente.Activo);
                    cmd.Parameters.AddWithValue("idTipo_Cliente", cliente.IdTipoRazonSocial);
                    cmd.Parameters.AddWithValue("idRazon_Social", cliente.IdRazonSocial);

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

        public List<ContactoModel> ObtenerContactoPorIdCliente(int idCliente)
        {
            var oContacto = new List<ContactoModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Obtener_Contacto_Por_IdCliente", conexion);
                cmd.Parameters.AddWithValue("IdCliente", idCliente);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oContacto.Add(new ContactoModel()
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
                            EsContactoPrincipal = Convert.ToInt32(dr["esContactoPrincipal"])
                        });
                    }
                }
            }
            return oContacto;
        }
        public List<ClienteModel> ObtenerClienteHijoPorIdPadre(int idCliente)
        {
            var oLista = new List<ClienteModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Obtener_Clientes_Hijos_Por_IdPadre", conexion);
                cmd.Parameters.AddWithValue("IdCliente", idCliente);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new ClienteModel()
                        {
                            IdCliente = Convert.ToInt32(dr["idCliente"]),
                            RazonSocial = dr["razonSocial"].ToString(),
                            TipoEmpresaRelacionada = dr["tipoEmpresa"].ToString(),
                            Rut = dr["rut"].ToString(),
                            UrlFoto = dr["urlFoto"].ToString(),
                            NombreFoto = dr["nombreFoto"].ToString(),
                            Direccion = dr["direccion"].ToString(),
                            Correo = dr["correo"].ToString(),
                            IdRegion = Convert.ToInt32(dr["idRegion"]),
                            IdComuna = Convert.ToInt32(dr["idComuna"]),
                            IdTipoRazonSocial = Convert.ToInt32(dr["idTipo_Cliente"]),
                        });
                    }
                }
            }
            return oLista;
        }

    }


}
