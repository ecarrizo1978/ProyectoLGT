export interface Contacto {
  idContacto: number,
  nombre : string,
  cargo: string,
  telefono1: string,
  telefono2: string,
  correoInstitucional: string,
  correoPersonal: string,
  idMedioContacto: number,
  idCliente: number,
  esContactoPrincipal: number,
  idCargo: number
}


export interface MyResponse {
  success: number,
  data: any,
  Mesagge: string
}

//probando
export interface addModelArgs {
  res: boolean,
  idRes: number
}


