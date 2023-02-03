import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { Usuario, MyResponse } from '../interfaces/usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

//constante

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  public logIn(usuario: Usuario): Observable<MyResponse> {
    console.log('logIn service', usuario);
    return this.http.post<MyResponse>(this.auxUrl + "api/Login/LogIn", {
      'CorreoPersonal': usuario.correoPersonal, 'Clave': usuario.clave
    });

  }

  //nuevo 23-09
  public forgotPassword(usuario: Usuario): Observable<MyResponse> {
    console.log('usuario forgotPassword;', usuario);
    return this.http.post<MyResponse>(this.auxUrl + "api/Usuario/ForgotSendEmailPassword", {
      'CorreoPersonal': usuario.correoPersonal, 'Clave': usuario.clave
    }, this.httpOptions);

  }

  //reset password 
  public ResetPassword(usuario: Usuario): Observable<MyResponse> {
    console.log('ResetPasswordService', usuario);
    return this.http.put<MyResponse>(this.auxUrl + "api/Usuario/RestablecerPassword", {
      'CorreoPersonal': usuario.correoPersonal, 'Clave': usuario.clave
    }, this.httpOptions);

  }



}
