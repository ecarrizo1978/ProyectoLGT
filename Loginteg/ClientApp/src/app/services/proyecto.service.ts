import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { Proyecto } from '../interfaces/proyecto';
import { MyResponse } from '../interfaces/contacto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  public algo: string = "hello";
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
    //this.auxUrl = "http://localhost:5167/"
    this.auxUrl = environment.servidor + ':' + environment.puerto + '/';
  }





  public obtenerProyectosCliente(idCliente: number) {
    console.log('en get obtenerProyecto: ', idCliente);

    return this.http.get<Proyecto[]>(this.auxUrl + "api/Proyecto/ListarProyectos/" + idCliente, this.httpOptions);
  }


    //agregar usuario, subcribe externo
  public agregarProyectoNew(proyecto: Proyecto) {
    console.log('en ProyectoService agregarProyectoNew: ', proyecto);

    return this.http.post<MyResponse>(this.auxUrl + "api/Proyecto/GuardarProyecto", {      
    'idCliente':proyecto.idCliente,
    'nombre':proyecto.nombre,
    'descripcion':proyecto.descripcion,
    'fechaCreacion':proyecto.fechaCreacion,
    'idEjecutivoComercial': proyecto.idEjecutivoComercial            
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }

  public editarProyecto(proyecto: Proyecto) {
    console.log('en ProyectoService editarProyecto: ', proyecto);

    return this.http.put<MyResponse>(this.auxUrl + "api/Proyecto/EditarProyecto", {
      //return this.http.post<MyResponse>(this.auxUrl + "api/Cliente/GuardarClienteReturn", {
      'idProyecto': proyecto.idProyecto,
      'idCliente': proyecto.idCliente,
      'nombre': proyecto.nombre,
      'descripcion': proyecto.descripcion,
      'fechaCreacion': proyecto.fechaCreacion,
      'idEjecutivoComercial': proyecto.idEjecutivoComercial            
    }, this.httpOptions)    

  }



  //eliminar
  public EliminarProyecto(idProyecto: number) {
    console.log("en service eliminar proyecto", idProyecto)
    return this.http.delete<MyResponse>(this.auxUrl + "api/Proyecto/EliminarProyecto/" + idProyecto, this.httpOptions);
  }

  public obtenerProyecto(idProyecto: number){
    console.log('en get obtenerProyecto: ', idProyecto);

    return this.http.get<Proyecto>(this.auxUrl + "api/Proyecto/ObtenerProyecto/" + idProyecto, this.httpOptions);
  }

 }


