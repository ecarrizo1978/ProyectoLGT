export interface Usuario {
  id: number,
  nombre: string,
  rut: string,
  jefatura: string,
  cargo: string,
  direccion: string,
  telefono: string,
  departamento: string,
  idRol: number,
  correoCorporativo: string,
  correoPersonal: string,
  urlFoto: string,
  nombreFoto: string,
  clave: string,
  esActivo: string,
  fechaRegistro: string
}

export interface MyResponse {
  success: number,
  data: any,
  Mesagge: string
}



