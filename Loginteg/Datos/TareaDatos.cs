using angularTest.Models;
using System.Data;
using System.Data.SqlClient;



namespace angularTest.Datos
{
    public class TareaDatos
    {
        //obtener lista de contactos desde SP
        public List<TareaModel> Listar()
        {
            var oLista = new List<TareaModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_Tareas", conexion);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new TareaModel()
                        {
                            IdTarea = Convert.ToInt32(dr["IdTarea"]),
                            Nombre = dr["Nombre"].ToString(),
                            Descripcion = dr["Descripcion"].ToString(),
                            IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                            FechaInicio = dr["FechaInicio"].ToString(),
                            FechaTermino = dr["FechaTermino"].ToString(),
                            Estado = dr["Estado"].ToString(),
                        });
                    }
                }
            }
            return oLista;
        }


        //SP_Listar_Tareas_Por_Usuario nuevo
        public List<TareaModel> ListarTareasPorUsuario(int idUsuario)
        {
            var oLista = new List<TareaModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_Tareas_Por_Usuario", conexion);
                cmd.Parameters.AddWithValue("IdUsuario", idUsuario);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new TareaModel()
                        {
                            IdTarea = Convert.ToInt32(dr["IdTarea"]),
                            Nombre = dr["Nombre"].ToString(),
                            Descripcion = dr["Descripcion"].ToString(),
                            IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                            FechaInicio = dr["FechaInicio"].ToString(),
                            FechaTermino = dr["FechaTermino"].ToString(),
                            Estado = dr["Estado"].ToString(),
                        });
                    }
                }
            }
            return oLista;
        }




        public bool Agregar(TareaModel tarea)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Agregar_Tarea", conexion);
                    cmd.Parameters.AddWithValue("Nombre", tarea.Nombre);
                    cmd.Parameters.AddWithValue("Descripcion", tarea.Descripcion);
                    cmd.Parameters.AddWithValue("IdUsuario", Convert.ToInt32(tarea.IdUsuario));
                    cmd.Parameters.AddWithValue("FechaInicio", tarea.FechaInicio);
                    cmd.Parameters.AddWithValue("FechaTermino", tarea.FechaTermino);
                    cmd.Parameters.AddWithValue("Estado", tarea.Estado);

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
        public bool Editar(TareaModel tarea)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Tarea", conexion);
                    cmd.Parameters.AddWithValue("IdTarea", tarea.IdTarea);
                    cmd.Parameters.AddWithValue("Nombre", tarea.Nombre);
                    cmd.Parameters.AddWithValue("Descripcion", tarea.Descripcion);
                    cmd.Parameters.AddWithValue("IdUsuario", tarea.IdUsuario);
                    cmd.Parameters.AddWithValue("FechaInicio", Convert.ToDateTime(tarea.FechaInicio.ToString()));
                    cmd.Parameters.AddWithValue("FechaTermino", Convert.ToDateTime(tarea.FechaTermino.ToString()));
                    cmd.Parameters.AddWithValue("Estado", tarea.Estado);
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
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Tarea", conexion);
                    cmd.Parameters.AddWithValue("IdTarea", id);
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





    }
}
