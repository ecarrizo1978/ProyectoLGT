import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { Contacto, MyResponse } from '../interfaces/contacto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class ContactoService {
  public algo: string = "hello";
  baseUrl: string;
  auxUrl: string;

  //para actualizar la lista
  @Output() disparadorLista: EventEmitter<any> = new EventEmitter();

  get httpParams() {
    return new HttpParams()
      .set('fields', 'nombre,telefono,correo');
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

  public GetContactos(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>(this.auxUrl + "api/Contacto/ListarContactos", this.httpOptions);
  }


  //agregar usuario, subcribe externo
  public GuardarContacto(contacto: Contacto) {

    return this.http.post<MyResponse>(this.auxUrl + "api/Contacto/Guardar", {
      'IdContacto': contacto.idContacto,
      'Nombre': contacto.nombre,
      'Cargo': contacto.cargo,
      'Telefono1': contacto.telefono1,
      'Telefono2': contacto.telefono2,
      'CorreoInstitucional': contacto.correoInstitucional,
      'CorreoPersonal': contacto.correoPersonal,
      'IdMedioContacto': contacto.idMedioContacto,
      'IdCliente': contacto.idCliente,
      "EsContactoPrincipal": contacto.esContactoPrincipal,
      "IdCargo": contacto.idCargo
    }, this.httpOptions);

  }

  //update
  public EditarContacto(contacto: Contacto, id: number): Observable<MyResponse> {

    return this.http.put<MyResponse>(this.auxUrl + "api/Contacto/Editar/" + id, {
      'IdContacto': contacto.idContacto,
      'Nombre': contacto.nombre,
      'Cargo': contacto.cargo,
      'Telefono1': contacto.telefono1,
      'Telefono2': contacto.telefono2,
      'CorreoInstitucional': contacto.correoInstitucional,
      'CorreoPersonal': contacto.correoPersonal,
      'IdMedioContacto': contacto.idMedioContacto,
      'IdCliente': contacto.idCliente,
      "EsContactoPrincipal": contacto.esContactoPrincipal,
      "IdCargo": contacto.idCargo
    }, this.httpOptions);

  }


  //eliminar
  public EliminarContacto(idContacto: any) {
    console.log('en EliminarContactoService: ', idContacto)
    return this.http.delete<MyResponse>(this.auxUrl + "api/Contacto/Eliminar/" + idContacto, this.httpOptions);
  }

  //login
  public Ingresar(nombre: any, password: any) {
    return this.http.post<MyResponse>(this.auxUrl + "api/Mantenedor/LoginContacto/", {
      'Nombre': nombre, 'Password': password
    }, this.httpOptions).subscribe(result => {
      console.log(result);
    },
      err => console.error(err)
    );
  }


  //agregado 14-09
  public GuardarInstitucionContactoREL(listaInstituciones: string, idContacto: number) {
    console.log('en ClienteService GuardarInstitucionContactoREL: listaInstituciones: ', listaInstituciones, ' idContacto: ', idContacto);
    return this.http.post<MyResponse>(this.auxUrl + "api/Contacto/Guardar_Institucion_Contacto_REL/" + listaInstituciones + "/" + idContacto, {},this.httpOptions);
  }

  public EditarInstitucionContactoREL(listaInstituciones: string, idContacto: number) {
    console.log('en ClienteService EditarInstitucionContactoREL: listaInstituciones: ', listaInstituciones, ' idContacto: ', idContacto);
    return this.http.post<MyResponse>(this.auxUrl + "api/Contacto/Editar_Institucion_Contacto_REL/" + listaInstituciones + "/" + idContacto, {}, this.httpOptions);
  }

  public BorrarInstitucionContactoREL(idContacto: number) {
    console.log('en ClienteService BorrarInstitucionContactoREL: idContacto: ', idContacto);
    return this.http.post<MyResponse>(this.auxUrl + "api/Contacto/Borrar_Institucion_Contacto_REL/" + idContacto, {}, this.httpOptions);
  }



}
