import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { MyResponse } from '../interfaces/contacto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tarea } from '../interfaces/tarea';
import { Interaccion } from '../interfaces/interaccion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteraccionService {

  baseUrl!: string;
  auxUrl!: string;


  //para actualizar la lista
  @Output() disparadorLista: EventEmitter<any> = new EventEmitter();

  get httpParams() {
    return new HttpParams()
      .set('fields', 'idInteraccion, nombre');
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.JWT
    })
  }

  constructor(protected http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    //this.auxUrl = "http://localhost:5167/"
    this.auxUrl = environment.servidor + ':' + environment.puerto + '/';

  }



  public ListarHistorialInteraccion(): Observable<Interaccion[]> {

    return this.http.get<Interaccion[]>(this.auxUrl + "api/Interaccion/Listar");
  }



  public AgregarInteraccion(interaccion: Interaccion): Observable<MyResponse> {

    return this.http.post<MyResponse>(this.auxUrl + "api/Interaccion/Agregar", {
      'IdInteraccion': interaccion.id,
      'NombreEmisor': interaccion.nombreEmisor,
      'TipoSolicitud': interaccion.tipoSolicitud,
      'Solicitud': interaccion.solicitud,
      'IdUsuario': interaccion.idUsuario,
      'FechaCreacion': interaccion.fechaCreacion,
      'FechaActualizacion': interaccion.fechaActualizacion,
      'Glosa': interaccion.glosa,
      'UrlArchivo': interaccion.urlArchivo,
      'NombreArchivo': interaccion.nombreArchivo,
      'IdContacto': interaccion.idContacto,
      'IdOrdenDeTrabajo': interaccion.idOrdenTrabajo,

    }, this.httpOptions);

  }



  public actualizarInteraccion(interaccion: Interaccion, id: number): Observable<MyResponse> {

    return this.http.put<MyResponse>(this.auxUrl + "api/Interaccion/Editar/" + id, {
      'IdInteraccion': interaccion.id,
      'NombreEmisor': interaccion.nombreEmisor,
      'TipoSolicitud': interaccion.tipoSolicitud,
      'Solicitud': interaccion.solicitud,
      'IdUsuario': interaccion.idUsuario,
      'FechaCreacion': interaccion.fechaCreacion,
      'FechaActualizacion': interaccion.fechaActualizacion,
      'Glosa': interaccion.glosa,
      'UrlArchivo': interaccion.urlArchivo,
      'NombreArchivo': interaccion.nombreArchivo,
      'IdContacto': interaccion.idContacto,
      'IdOrdenDeTrabajo': interaccion.idOrdenTrabajo,

    }, this.httpOptions);

  }


  //eliminar
  public EliminarInteraccion(id: number) {
    return this.http.delete<MyResponse>(this.auxUrl + "api/Interaccion/Eliminar/" + id, this.httpOptions);
  }


}
