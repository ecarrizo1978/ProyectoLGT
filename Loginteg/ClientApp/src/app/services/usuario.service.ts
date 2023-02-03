import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { Usuario, MyResponse } from '../interfaces/usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

//constante

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl!: string;
  auxUrl!: string;


  //para actualizar la lista
  @Output() disparadorLista: EventEmitter<any> = new EventEmitter();

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

  constructor(protected http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;

    this.auxUrl = environment.servidor + ':' + environment.puerto + '/';

  }

  public GetUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.auxUrl + "api/Usuario/ListarUsuarios", this.httpOptions);
  }

  //agregar usuario
  public agregarUsuario(usuario: Usuario) {
    console.log('usuario agregarUsuarioService;', usuario);

    return this.http.post<MyResponse>(this.auxUrl + "api/Usuario/GuardarUsuario", {
      'IdUsuario': usuario.id,
      'Nombre': usuario.nombre,
      'Rut': usuario.rut,
      'Jefatura': usuario.jefatura,
      'Cargo': usuario.cargo,
      'Direccion': usuario.direccion,
      'Telefono': usuario.telefono,
      'Departamento': usuario.departamento,
      'IdRol': usuario.idRol,
      'CorreoCorporativo': usuario.correoCorporativo,
      'CorreoPersonal': usuario.correoPersonal,
      'UrlFoto': usuario.urlFoto,
      'NombreFoto': usuario.nombreFoto,
      'Clave': usuario.clave,
      'EsActivo': usuario.esActivo,
      'FechaRegistro': usuario.fechaRegistro,
    }, this.httpOptions)

   // this.listaUsuarios.unshift();

  }

    //update
  public EditarUsuario(usuario: any, id: number): Observable<MyResponse> {

    return this.http.put<MyResponse>(this.auxUrl + "api/Usuario/EditarUsuario", {
      'IdUsuario': id,
      'Nombre': usuario.nombre,
      'Rut': usuario.rut,
      'Jefatura': usuario.jefatura,
      'Cargo': usuario.cargo,
      'Direccion': usuario.direccion,
      'Telefono': usuario.telefono,
      'Departamento': usuario.departamento,
      'IdRol': usuario.idRol,
      'CorreoCorporativo': usuario.correoCorporativo,
      'CorreoPersonal': usuario.correoPersonal,
      'UrlFoto': usuario.urlFoto,
      'NombreFoto': usuario.nombreFoto,
      'Clave': usuario.clave,
      'EsActivo': usuario.esActivo,
      'FechaRegistro': usuario.fechaRegistro,
    }, this.httpOptions)

  }


  //eliminar
  public EliminarUsuario(idUsuario: any): Observable<MyResponse> {
    return this.http.delete<MyResponse>(this.auxUrl + "api/Usuario/EliminarUsuario/" + idUsuario, this.httpOptions);
  }

}
