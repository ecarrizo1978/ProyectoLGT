
export interface Institucion {
  id: number,
  nombre: string,
  idComuna: number
}


export interface Region {
  id: number,
  nombre: string
}

export interface Comuna {
  id: number,
  nombre: string
}

export interface MedioContacto {
  id: number,
  nombre: string,
  esActivo: boolean,
  fechaCreacion: string
}


export interface Rol {
  id: number,
  descripcion: string,
  esActivo: number,
  fechaRegistro: string,
  menuAccess: string
}

export interface Departamento {
  id: number,
  nombre: string,
  esActivo: boolean,
  fechaCreacion: string,
  idJefatura: number
}


