using angular2.Models;
using AngularMaterial.Models;
using angularTest.Models;
using Loginteg.Models;
using System.Data;
using System.Data.SqlClient;



namespace angularTest.Datos
{
    public class MenuDatos
    {
        //obtener lista de contactos desde SP
        public List<MenuModel> ListarMenus(string idRol)
        {
            var oLista = new List<MenuModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_Menus", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("IdRol", idRol);
                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                            Convert.ToInt32(dr["IdMenu"]);
                            dr["Descripcion"].ToString();
                            Convert.ToInt32(dr["IdMenuPadre"]);
                            dr["Icono"].ToString();
                            dr["Controlador"].ToString();
                            dr["PaginaAccion"].ToString();
                            Convert.ToInt32(dr["EsActivo"]);
                        dr["FechaRegistro"].ToString();
                        oLista.Add(new MenuModel()
                        {
                            IdMenu = Convert.ToInt32(dr["IdMenu"]),
                            Descripcion = dr["Descripcion"].ToString(),
                            IdMenuPadre = Convert.ToInt32(dr["IdMenuPadre"]),
                            Icono = dr["Icono"].ToString(),
                            Controlador = dr["Controlador"].ToString(),
                            PaginaAccion = dr["PaginaAccion"].ToString(),
                            EsActivo = Convert.ToInt32(dr["EsActivo"]),
                            FechaRegistro = dr["FechaRegistro"].ToString(),
                        });
                    }
                }
            }
            return oLista;
        }

        public List<RolModel> ListarRoles()
        {
            var oLista = new List<RolModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_GetRoles_Mantenedor", conexion);
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
                                MenuAccess = dr["menuAccess"].ToString()
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

        public RolModel ObtenerDatosRol()
        {
            var oLista = new RolModel();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Get_Roles", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Id = Convert.ToInt32(dr["idRol"]);
                            oLista.Descripcion = dr["descripcion"].ToString();
                            oLista.EsActivo = Convert.ToBoolean(dr["EsActivo"]);
                            oLista.FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("MM/dd/yyyy");
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

        public int ObtenerPermiso(string paginaAccion, string idRol)
        {
            var oLista = new List<MenuModel>();
            var con = new Conexion();
            int retIdRol = 0;
            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Obtener_Permiso_Menu", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("IdRol", idRol);
                cmd.Parameters.AddWithValue("paginaAccion", paginaAccion);

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        retIdRol = Convert.ToInt32(dr["IdRol"]);
                    }
                }
            }
            return retIdRol;
        }

        public List<MenuModel> ListarMenusActivos()
        {
            var oLista = new List<MenuModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_Menus_Activos", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Convert.ToInt32(dr["IdMenu"]);
                        dr["Descripcion"].ToString();
                        Convert.ToInt32(dr["IdMenuPadre"]);
                        dr["Icono"].ToString();
                        dr["Controlador"].ToString();
                        dr["PaginaAccion"].ToString();
                        Convert.ToInt32(dr["EsActivo"]);
                        dr["FechaRegistro"].ToString();
                        oLista.Add(new MenuModel()
                        {
                            IdMenu = Convert.ToInt32(dr["IdMenu"]),
                            Descripcion = dr["Descripcion"].ToString(),
                            IdMenuPadre = Convert.ToInt32(dr["IdMenuPadre"]),
                            Icono = dr["Icono"].ToString(),
                            Controlador = dr["Controlador"].ToString(),
                            PaginaAccion = dr["PaginaAccion"].ToString(),
                            EsActivo = Convert.ToInt32(dr["EsActivo"]),
                            FechaRegistro = dr["FechaRegistro"].ToString(),
                        });
                    }
                }
            }
            return oLista;
        }
        public string ListarRolesMenusActivos(int idRol)
        {
            var oLista = "";
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_RolesMenus_Activos", conexion);
                cmd.Parameters.AddWithValue("IdRol", idRol);
                cmd.CommandType = CommandType.StoredProcedure;
                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista = dr["idMenu"].ToString();
                    }
                }
            }
            return oLista;
        }

        public int GuardarRol(RolModel rol)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Rol", conexion);
                    cmd.Parameters.AddWithValue("descripcion", rol.Descripcion);
                    cmd.Parameters.AddWithValue("esActivo", rol.EsActivo);
                    cmd.Parameters.Add("@new_identity", SqlDbType.Int, 0, "new_identity");
                    cmd.Parameters["@new_identity"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    Console.WriteLine("RowsAffected: {0}", rowsAffected);
                    int idRol = Convert.ToInt32(cmd.Parameters["@new_identity"].Value.ToString());
                    Console.WriteLine("Record inserted successfully. ID = " + idRol);

                    //retornar id registro
                    rpta = idRol;
                }

                var menuAccess = rol.MenuAccess.Split(",");
                foreach (var item in menuAccess)
                {
                    using (var conexion = new SqlConnection(con.getCadernaSQL()))
                    {
                        conexion.Open();
                        SqlCommand cmd = new SqlCommand("SP_Guardar_RolMenu", conexion);
                        cmd.Parameters.AddWithValue("idRol", rpta);
                        cmd.Parameters.AddWithValue("idMenu", item);
                        cmd.Parameters.AddWithValue("esActivo", true);
                        cmd.CommandType = CommandType.StoredProcedure;
                        Int32 rowsAffected = cmd.ExecuteNonQuery();

                        //retornar id registro
                        //rpta = idRol;
                    }

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

        public int EditarRol(RolModel rol)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Rol", conexion);
                    cmd.Parameters.AddWithValue("descripcion", rol.Descripcion);
                    cmd.Parameters.AddWithValue("esActivo", rol.EsActivo);
                    cmd.Parameters.AddWithValue("idRol", rol.Id);
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                }

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Borrar_Rol_RolMenu", conexion);
                    cmd.Parameters.AddWithValue("idRol", rol.Id);
                    cmd.Parameters.AddWithValue("menus", rol.MenuAccess);
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                }

                //var menuAccess = rol.MenuAccess.Split(",");
                //foreach (var item in menuAccess)
                //{
                //    using (var conexion = new SqlConnection(con.getCadernaSQL()))
                //    {
                //        conexion.Open();
                //        SqlCommand cmd = new SqlCommand("SP_Guardar_RolMenu", conexion);
                //        cmd.Parameters.AddWithValue("idRol", rol.Id);
                //        cmd.Parameters.AddWithValue("idMenu", item);
                //        cmd.Parameters.AddWithValue("esActivo", true);
                //        cmd.CommandType = CommandType.StoredProcedure;
                //        Int32 rowsAffected = cmd.ExecuteNonQuery();

                //    }

                //}
                rpta = rol.Id;
                return rpta;
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }

        public bool EliminarRol(int id)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Rol", conexion);
                    cmd.Parameters.AddWithValue("IdRol", id);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
                    rpta = idRegistro;
                }
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }
        public List<RazonSocialModel> ListarRazonSocial()
        {
            var oLista = new List<RazonSocialModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_GetRazon_Social", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new RazonSocialModel()
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
        public List<RazonSocialModel> ListarRazonSocialActiva()
        {
            var oLista = new List<RazonSocialModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_GetRazonSocial", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new RazonSocialModel()
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
        public int GuardarRazonSocial(RazonSocialModel rol)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Razon_Social", conexion);
                    cmd.Parameters.AddWithValue("descripcion", rol.descripcion);
                    cmd.Parameters.AddWithValue("esActivo", rol.esActivo);
                    cmd.Parameters.Add("@new_identity", SqlDbType.Int, 0, "new_identity");
                    cmd.Parameters["@new_identity"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    Console.WriteLine("RowsAffected: {0}", rowsAffected);
                    int idRol = Convert.ToInt32(cmd.Parameters["@new_identity"].Value.ToString());
                    Console.WriteLine("Record inserted successfully. ID = " + idRol);

                    //retornar id registro
                    rpta = idRol;
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

        public RazonSocialModel ObtenerDatosRazonSocial()
        {
            var oLista = new RazonSocialModel();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_GetRazon_Social", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.id = Convert.ToInt32(dr["id"]);
                            oLista.descripcion = dr["descripcion"].ToString();
                            oLista.esActivo = Convert.ToBoolean(dr["EsActivo"]);
                            oLista.fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy");
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
        public bool EditarRazonSocial(RazonSocialModel rol)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_RazonSocial", conexion);
                    cmd.Parameters.AddWithValue("descripcion", rol.descripcion);
                    cmd.Parameters.AddWithValue("esActivo", rol.esActivo);
                    cmd.Parameters.AddWithValue("id", rol.id);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
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
        public bool EliminarRazonSocial(int id)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_RazonSocial", conexion);
                    cmd.Parameters.AddWithValue("Id", id);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
                    rpta = idRegistro;
                }
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }

        public List<CargosModel> ListarCargos()
        {
            var oLista = new List<CargosModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Get_Cargos", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new CargosModel()
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
        public List<CargosModel> ListaCargosActivos()
        {
            var oLista = new List<CargosModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_GetCargos", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new CargosModel()
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

        public int GuardarCargos(CargosModel cargos)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Cargos", conexion);
                    cmd.Parameters.AddWithValue("descripcion", cargos.descripcion);
                    cmd.Parameters.AddWithValue("esActivo", cargos.esActivo);
                    cmd.Parameters.Add("@new_identity", SqlDbType.Int, 0, "new_identity");
                    cmd.Parameters["@new_identity"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    Console.WriteLine("RowsAffected: {0}", rowsAffected);
                    int idRol = Convert.ToInt32(cmd.Parameters["@new_identity"].Value.ToString());
                    Console.WriteLine("Record inserted successfully. ID = " + idRol);

                    //retornar id registro
                    rpta = idRol;
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

        public CargosModel ObtenerDatosCargos()
        {
            var oLista = new CargosModel();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Get_Cargos", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.id = Convert.ToInt32(dr["id"]);
                            oLista.descripcion = dr["descripcion"].ToString();
                            oLista.esActivo = Convert.ToBoolean(dr["EsActivo"]);
                            oLista.fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy");
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
        public bool EditarCargos(CargosModel rol)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Cargos", conexion);
                    cmd.Parameters.AddWithValue("descripcion", rol.descripcion);
                    cmd.Parameters.AddWithValue("esActivo", rol.esActivo);
                    cmd.Parameters.AddWithValue("id", rol.id);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
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
        public bool EliminarCargos(int id)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Cargos", conexion);
                    cmd.Parameters.AddWithValue("Id", id);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
                    rpta = idRegistro;
                }
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }
        //Comienza departamentos
        public List<DepartamentoModel> ListarDepartamentos()
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
                                esActivo = Convert.ToBoolean(dr["EsActivo"]),
                                fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy"),
                                idJefatura = Convert.ToInt32(dr["idJefatura"])
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
        public List<DepartamentoModel> ListaDepartamentosActivos()
        {
            var oLista = new List<DepartamentoModel>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Get_Departamentos", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new DepartamentoModel()
                            {
                                Id = Convert.ToInt32(dr["idDepartamento"]),
                                Nombre = dr["nombre"].ToString(),
                                esActivo = Convert.ToBoolean(dr["EsActivo"]),
                                fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy"),
                                idJefatura = Convert.ToInt32(dr["idJefatura"])
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

        public int GuardarDepartamentos(DepartamentoModel cargos)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Departamentos", conexion);
                    cmd.Parameters.AddWithValue("nombre", cargos.Nombre);
                    cmd.Parameters.AddWithValue("esActivo", cargos.esActivo);
                    cmd.Parameters.AddWithValue("idJefatura", cargos.idJefatura);
                    cmd.Parameters.Add("@new_identity", SqlDbType.Int, 0, "new_identity");
                    cmd.Parameters["@new_identity"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    Console.WriteLine("RowsAffected: {0}", rowsAffected);
                    int idRol = Convert.ToInt32(cmd.Parameters["@new_identity"].Value.ToString());
                    Console.WriteLine("Record inserted successfully. ID = " + idRol);

                    //retornar id registro
                    rpta = idRol;
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

        public DepartamentoModel ObtenerDatosDepartamentos()
        {
            var oLista = new DepartamentoModel();
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
                            oLista.Id = Convert.ToInt32(dr["idDepartamento"]);
                            oLista.Nombre = dr["nombre"].ToString();
                            oLista.esActivo = Convert.ToBoolean(dr["EsActivo"]);
                            oLista.fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy");
                            oLista.idJefatura = Convert.ToInt32(dr["idJefatura"]);
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
        public bool EditarDepartamentos(DepartamentoModel rol)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Departamentos", conexion);
                    cmd.Parameters.AddWithValue("nombre", rol.Nombre);
                    cmd.Parameters.AddWithValue("esActivo", rol.esActivo);
                    cmd.Parameters.AddWithValue("idDepartamento", rol.Id);
                    cmd.Parameters.AddWithValue("idJefatura", rol.idJefatura);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
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
        public bool EliminarDepartamentos(int id)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Departamentos", conexion);
                    cmd.Parameters.AddWithValue("IdDepartamento", id);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
                    rpta = idRegistro;
                }
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }
        //Comienza Medios Contacto
        public List<MedioContacto> ListaMediosContacto()
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
                                esActivo = Convert.ToBoolean(dr["EsActivo"]),
                                fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy")
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
        public List<MedioContacto> ListaMediosContactoActivos()
        {
            var oLista = new List<MedioContacto>();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Get_MediosContacto", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oLista.Add(new MedioContacto()
                            {
                                Id = Convert.ToInt32(dr["idMedio_Contacto"]),
                                Nombre = dr["descripcion"].ToString(),
                                esActivo = Convert.ToBoolean(dr["EsActivo"]),
                                fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy")
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

        public int GuardarMediosContacto(MedioContacto cargos)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Medios_Contacto", conexion);
                    cmd.Parameters.AddWithValue("descripcion", cargos.Nombre);
                    cmd.Parameters.AddWithValue("esActivo", cargos.esActivo);
                    cmd.Parameters.Add("@new_identity", SqlDbType.Int, 0, "new_identity");
                    cmd.Parameters["@new_identity"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    Console.WriteLine("RowsAffected: {0}", rowsAffected);
                    int idRol = Convert.ToInt32(cmd.Parameters["@new_identity"].Value.ToString());
                    Console.WriteLine("Record inserted successfully. ID = " + idRol);

                    //retornar id registro
                    rpta = idRol;
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

        public MedioContacto ObtenerDatosMediosContacto()
        {
            var oLista = new MedioContacto();
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
                            oLista.Id = Convert.ToInt32(dr["idMedio_Contacto"]);
                            oLista.Nombre = dr["descripcion"].ToString();
                            oLista.esActivo = Convert.ToBoolean(dr["EsActivo"]);
                            oLista.fechaCreacion = Convert.ToDateTime(dr["FechaCreacion"]).ToString("MM/dd/yyyy");
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
        public bool EditarMediosContacto(MedioContacto rol)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Medios_Contacto", conexion);
                    cmd.Parameters.AddWithValue("descripcion", rol.Nombre);
                    cmd.Parameters.AddWithValue("esActivo", rol.esActivo);
                    cmd.Parameters.AddWithValue("idMedio_Contacto", rol.Id);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
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
        public bool EliminarMediosContacto(int id)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Medios_Contacto", conexion);
                    cmd.Parameters.AddWithValue("idMedio_Contacto", id);
                    cmd.Parameters.Add("@outputValue", SqlDbType.Bit, 0, "outputValue");
                    cmd.Parameters["@outputValue"].Direction = ParameterDirection.Output;
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.ExecuteNonQuery();
                    bool idRegistro = Convert.ToBoolean(cmd.Parameters["@outputValue"].Value.ToString());
                    rpta = idRegistro;
                }
            }
            catch (Exception e)
            {
                string error = e.Message;
                throw;
            }

            return rpta;
        }

    }
}
