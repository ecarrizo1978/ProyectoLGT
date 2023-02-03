export interface Menu {
  nombre: string,
  redirect: string,
}

export interface NewMenu {
  idMenu: number,
  descripcion: string,
  idMenuPadre: number,
  icono: string,
  controlador: string,
  paginaAccion: string,
  esActivo: number,
  fechaRegistro: string,
  esMenuItem: number
}

export interface NewMenuEdit {
  idMenu: number,
  descripcion: string,
  idMenuPadre: number,
  icono: string,
  controlador: string,
  paginaAccion: string,
  esActivo: number,
  fechaRegistro: string,
  esMenuItem: number,
  isChecked: boolean
}



