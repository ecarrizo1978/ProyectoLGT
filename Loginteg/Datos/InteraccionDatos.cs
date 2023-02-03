using angular2.Models;
using System.Data;
using System.Data.SqlClient;


namespace angularTest.Datos
{
    public class InteraccionDatos
    {
        //obtener lista de contactos desde SP
        public List<InteraccionModel> Listar()
        {
            var oLista = new List<InteraccionModel>();
            var con = new Conexion();

            using (var conexion = new SqlConnection(con.getCadernaSQL()))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("SP_Listar_Historial_Interaccion", conexion);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = cmd.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        oLista.Add(new InteraccionModel()
                        {
                            IdInteraccion = Convert.ToInt32(dr["IdInteraccion"]),
                            NombreEmisor = dr["NombreEmisor"].ToString(),
                            TipoSolicitud = dr["TipoSolicitud"].ToString(),
                            Solicitud = dr["Solicitud"].ToString(),
                            IdUsuario = Convert.ToInt32(dr["IdUsuario"].ToString()),
                            FechaCreacion = dr["FechaCreacion"].ToString(),
                            FechaActualizacion = dr["FechaActualizacion"].ToString(),
                            Glosa = dr["Glosa"].ToString(),
                            UrlArchivo = dr["UrlArchivo"].ToString(),
                            NombreArchivo = dr["NombreArchivo"].ToString(),
                            IdContacto = Convert.ToInt32(dr["IdContacto"]),
                            IdOrdenDeTrabajo = Convert.ToInt32(dr["IdOrdenDeTrabajo"]),
                        });
                    }
                }
            }
            return oLista;
        }

        public bool Agregar(InteraccionModel interaccion)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Agregar_Interaccion", conexion);
                    cmd.Parameters.AddWithValue("NombreEmisor", interaccion.NombreEmisor);
                    cmd.Parameters.AddWithValue("TipoSolicitud", interaccion.TipoSolicitud);
                    cmd.Parameters.AddWithValue("Solicitud", interaccion.Solicitud);
                    cmd.Parameters.AddWithValue("IdUsuario", interaccion.IdUsuario);
                    cmd.Parameters.AddWithValue("FechaCreacion", interaccion.FechaCreacion);
                    cmd.Parameters.AddWithValue("FechaActualizacion", interaccion.FechaActualizacion);
                    cmd.Parameters.AddWithValue("Glosa", interaccion.Glosa);
                    cmd.Parameters.AddWithValue("UrlArchivo", interaccion.UrlArchivo);
                    cmd.Parameters.AddWithValue("NombreArchivo", interaccion.NombreArchivo);
                    cmd.Parameters.AddWithValue("IdContacto", interaccion.IdContacto);
                    cmd.Parameters.AddWithValue("IdOrdenDeTrabajo", interaccion.IdOrdenDeTrabajo);

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
        public bool Editar(InteraccionModel interaccion)
        {
            bool rpta = false;

            try
            {
                var con = new Conexion();

                using (var conexion = new SqlConnection(con.getCadernaSQL()))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_Editar_Interaccion", conexion);
                    cmd.Parameters.AddWithValue("IdInteraccion", interaccion.IdInteraccion);
                    cmd.Parameters.AddWithValue("NombreEmisor", interaccion.NombreEmisor);
                    cmd.Parameters.AddWithValue("IdTipoSolicitud", interaccion.TipoSolicitud);
                    cmd.Parameters.AddWithValue("IdSolicitud", interaccion.Solicitud);
                    cmd.Parameters.AddWithValue("IdUsuario", interaccion.IdUsuario);
                    cmd.Parameters.AddWithValue("FechaCreacion", interaccion.FechaCreacion);
                    cmd.Parameters.AddWithValue("FechaActualizacion", interaccion.FechaActualizacion);
                    cmd.Parameters.AddWithValue("Glosa", interaccion.Glosa);
                    cmd.Parameters.AddWithValue("UrlArchivo", interaccion.UrlArchivo);
                    cmd.Parameters.AddWithValue("NombreArchivo", interaccion.NombreArchivo);
                    cmd.Parameters.AddWithValue("IdContacto", interaccion.IdContacto);
                    cmd.Parameters.AddWithValue("IdOrdenDeTrabajo", interaccion.IdOrdenDeTrabajo);


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
                    SqlCommand cmd = new SqlCommand("SP_Eliminar_Interaccion", conexion);
                    cmd.Parameters.AddWithValue("IdInteraccion", id);
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
