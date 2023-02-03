import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { MyResponse } from "../interfaces/contacto";
import { Menu, NewMenu, NewMenuEdit } from "../interfaces/menu";
import { Rol } from "../interfaces/shared";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class MantenedorRolesService {

  baseUrl!: string;
  auxUrl!: string;
get httpParams() {
  return new HttpParams()
    .set('fields', 'nombre,password,telefono,correo');
}

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.JWT
  })
  }

  @Output() disparadorLista: EventEmitter<any> = new EventEmitter();

  constructor(protected http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    //this.auxUrl = "http://localhost:5167/"
    this.auxUrl = environment.servidor + ':' + environment.puerto + '/';
  }

  public GetRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.auxUrl + "api/Mantenedor/ListarRoles", this.httpOptions);
  }

  public GetDatosRol(): Observable<Rol> {
    return this.http.get<Rol>(this.auxUrl + "api/Mantenedor/ObtenerDatosRol", this.httpOptions);
  }

  public GetMenusActivos(): Observable<NewMenuEdit[]> {
    return this.http.get<NewMenuEdit[]>(this.auxUrl + "api/Mantenedor/ListarMenusActivos", this.httpOptions);
  }

  public GetRolesMenusActivos(idRol: number): Observable<string> {
    return this.http.get<string>(this.auxUrl + "api/Mantenedor/ListarRolesMenusActivos/" + idRol, this.httpOptions);
  }

  public GetMenusActivosEdit(): Observable<NewMenuEdit[]> {
    return this.http.get<NewMenuEdit[]>(this.auxUrl + "api/Mantenedor/ListarMenusActivos", this.httpOptions);
  }

  public EliminarRol(idRol: number) {
    console.log("en service eliminar cliente", idRol)
    return this.http.delete<MyResponse>(this.auxUrl + "api/Mantenedor/EliminarRol/" + idRol, this.httpOptions);
  }

  public agregarRol(rol: Rol) {
    console.log('en ClienteService agregarClienteNew: ', rol);

    return this.http.post<MyResponse>(this.auxUrl + "api/Mantenedor/GuardarRol", {
      'Id': rol.id,
      'Descripcion': rol.descripcion,
      'EsActivo': rol.esActivo,
      'FechaRegistro': rol.fechaRegistro,
      'MenuAccess': rol.menuAccess
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }

  public editarRol(rol: Rol) {
    console.log('en ClienteService agregarClienteNew: ', rol);

    return this.http.put<MyResponse>(this.auxUrl + "api/Mantenedor/EditarRol", {
      'Id': rol.id,
      'Descripcion': rol.descripcion,
      'EsActivo': rol.esActivo,
      'FechaRegistro': rol.fechaRegistro,
      'MenuAccess': rol.menuAccess
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }
}


