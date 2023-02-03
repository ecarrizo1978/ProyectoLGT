using angular2.Models;
using angularTest.Models;
using System.Data;
using System.Data.SqlClient;



namespace angularTest.Datos
{
    public class ProyectoDatos
    {
        //obtener lista de contactos desde SP
        public List<ProyectoModel> Listar(int idCliente)
        {
            var oLista = new List<ProyectoModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Obtener_Proyecto_Por_Cliente", conexion);
                cmd.Parameters.AddWithValue("@idCliente", idCliente);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new ProyectoModel()
                        {
                            idProyecto = Convert.ToInt32(dr["idProyecto"]),
                            idCliente = Convert.ToInt32(dr["idCliente"]),
                            nombre = dr["nombre"].ToString(),
                            descripcion = dr["descripcion"].ToString(),
                            fechaCreacion = dr["fechaCreacion"].ToString(),
                            idEjecutivoComercial = Convert.ToInt32(dr["idEjecutivoComercial"]),
                            ejecutivo = dr["ejecutivo"].ToString(),

                        });
                    }
                }
            }
            return oLista;
        }

   

        //agregar contacto
        public int Guardar(ProyectoModel proyecto)
        {
            int rpta = 0;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Guardar_Proyecto", conexion);
                    
                    cmd.Parameters.AddWithValue("idCliente", proyecto.idCliente );
                    cmd.Parameters.AddWithValue("nombre", proyecto.nombre );
                    cmd.Parameters.AddWithValue("descripcion", proyecto.descripcion );
                    cmd.Parameters.AddWithValue("fechaCreacion", proyecto.fechaCreacion );
                    cmd.Parameters.AddWithValue("idEjecutivoComercial", proyecto.idEjecutivoComercial);                    

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
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Proyecto", conexion);
                    cmd.Parameters.AddWithValue("idProyecto", id);
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


        public ProyectoModel ObtenerProyecto(int idProyecto)
        {
            var oProyecto = new ProyectoModel();
            var con = new Conexion();
            try
            {

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();

                    SqlCommand cmd = new SqlCommand("SP_Obtener_Proyecto", conexion);
                    cmd.Parameters.AddWithValue("@idProyecto", idProyecto);
                    cmd.CommandType = CommandType.StoredProcedure;

                    using (var dr = cmd.ExecuteReader())
                    {
                        while (dr.Read())
                        {
                            oProyecto.idProyecto = Convert.ToInt32(dr["idProyecto"]);
                            oProyecto.idCliente = Convert.ToInt32(dr["idCliente"]);
                            oProyecto.nombre = dr["nombre"].ToString();
                            oProyecto.descripcion = dr["descripcion"].ToString();
                            oProyecto.fechaCreacion = dr["fechaCreacion"].ToString();
                            oProyecto.idEjecutivoComercial = Convert.ToInt32(dr["idEjecutivoComercial"]);


                        }
                    }
                }
                return oProyecto;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool Editar(ProyectoModel proyecto)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Proyecto", conexion);
                    cmd.Parameters.AddWithValue("idProyecto", proyecto.idProyecto);
                    cmd.Parameters.AddWithValue("idCliente", proyecto.idCliente);
                    cmd.Parameters.AddWithValue("nombre", proyecto.nombre);
                    cmd.Parameters.AddWithValue("descripcion", proyecto.descripcion);
                    cmd.Parameters.AddWithValue("fechaCreacion", proyecto.fechaCreacion);
                    cmd.Parameters.AddWithValue("idEjecutivoComercial", proyecto.idEjecutivoComercial);

                    cmd.CommandType = CommandType.StoredProcedure;
                    Int32 rowsAffected = cmd.ExecuteNonQuery();
                    Console.WriteLine("RowsAffected: {0}", rowsAffected);
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

    }


}
