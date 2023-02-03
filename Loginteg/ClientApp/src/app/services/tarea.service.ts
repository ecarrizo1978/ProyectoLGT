import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { MyResponse } from '../interfaces/contacto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tarea } from '../interfaces/tarea';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  baseUrl!: string;
  auxUrl!: string;


  //para actualizar la lista
  @Output() disparadorLista: EventEmitter<any> = new EventEmitter();

  get httpParams() {
    return new HttpParams()
      .set('fields', 'nombre,idUsuario,fechaInicio, fechaTermino,descripcion');
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

  public ListarTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.auxUrl + "api/Tarea/Listar");
  }

 
  public ListarTareasPorUsuario(idUsuario:number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.auxUrl + "api/Tarea/ListarTareasPorUsuario/" + idUsuario, this.httpOptions);
  }



  public AgregarTarea(tarea: Tarea) {
    console.log('AgregarTarea service', tarea)
    return this.http.post<any>(this.auxUrl + "api/Tarea/Agregar", {

      'IdTarea': tarea.id,
      'Nombre': tarea.nombre,
      'Descripcion': tarea.descripcion,
      'IdUsuario': tarea.idUsuario,
      'FechaInicio': tarea.fechaInicio,
      'FechaTermino': tarea.fechaTermino,
      'Estado': tarea.estado

    }, this.httpOptions);

  }


  public actualizarTarea(tarea: Tarea, id: number) {

    return this.http.put<any>(this.auxUrl + "api/Tarea/Editar/" + id, {

      'IdTarea': tarea.id,
      'Nombre': tarea.nombre,
      'Descripcion': tarea.descripcion,
      'IdUsuario': tarea.idUsuario,
      'FechaInicio': tarea.fechaInicio,
      'FechaTermino': tarea.fechaTermino,
      'Estado': tarea.estado

    }, this.httpOptions);

  }


  //eliminar
  public EliminarTarea(id: number) {
    return this.http.delete<MyResponse>(this.auxUrl + "api/Tarea/Eliminar/" + id, this.httpOptions);
  }


}
