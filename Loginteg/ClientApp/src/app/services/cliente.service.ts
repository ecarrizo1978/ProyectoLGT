import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { Contacto, MyResponse } from '../interfaces/contacto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

//constante


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

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


  public GetClientes(): Observable<Cliente[]> {
    console.log("en GetClientes")
    return this.http.get<Cliente[]>(this.auxUrl + "api/Cliente/ListarClientes", this.httpOptions);
    
  }

  public GetClientesRelacionados(idCliente: number): Observable<Cliente[]> {
    console.log("en GetClientes relacionados", idCliente)
    return this.http.get<Cliente[]>(this.auxUrl + "api/Cliente/ListarClientesRelacionados/" + idCliente, this.httpOptions);

  }

  //agregar usuario


    //agregar usuario, subcribe externo
  public agregarClienteNew(cliente: Cliente) {
    console.log('en ClienteService agregarClienteNew: ', cliente);

    return this.http.post<MyResponse>(this.auxUrl + "api/Cliente/GuardarCliente", {

      'IdCliente': cliente.idCliente,
      'RazonSocial': cliente.razonSocial,
      'Rut': cliente.rut,
      'IdTipoRazonSocial': cliente.idTipoRazonSocial,
      'IdRegion': cliente.idRegion,
      'IdComuna': cliente.idComuna,
      'Direccion': cliente.direccion,
      'Telefono': cliente.telefono,
      'NombreContacto1': cliente.nombreContacto1,
      'NombreContacto2': cliente.nombreContacto2,
      'Correo': cliente.correo,
      'UrlFoto': cliente.urlFoto,
      'NombreFoto': cliente.nombreFoto,
      'IdEmpresaPadre': cliente.idEmpresaPadre,
      'TipoEmpresaRelacionada': cliente.tipoEmpresaRelacionada,
      'Activo': 1,
      'IdRazonSocial': cliente.idRazon_Social
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }

  public editarCliente(cliente: Cliente) {
    console.log('en ClienteService editarCliente: ', cliente);

    return this.http.put<MyResponse>(this.auxUrl + "api/Cliente/EditarCliente", {

      'IdCliente': cliente.idCliente,
      'RazonSocial': cliente.razonSocial,
      'Rut': cliente.rut,
      'IdTipoRazonSocial': cliente.idTipoRazonSocial,
      'IdRegion': cliente.idRegion,
      'IdComuna': cliente.idComuna,
      'Direccion': cliente.direccion,
      'Telefono': cliente.telefono,
      'NombreContacto1': cliente.nombreContacto1,
      'NombreContacto2': cliente.nombreContacto2,
      'Correo': cliente.correo,
      'UrlFoto': cliente.urlFoto,
      'NombreFoto': cliente.nombreFoto,
      'IdEmpresaPadre': cliente.idEmpresaPadre,
      'TipoEmpresaRelacionada': cliente.tipoEmpresaRelacionada,
      'IdRazonSocial': cliente.idRazon_Social
    }, this.httpOptions)    

  }

  public actualizarEmpresasRel(idEmpresaPadre: number, listaIds : string) {
    console.log('en ClienteService actualizarEmpresasRel: idpadre: ', idEmpresaPadre, ' empresasHijas: ', listaIds);
    //ultima modificacion 12-09 : ksandoval
    return this.http.post<MyResponse>(this.auxUrl + "api/Cliente/ActualizarEmpresasRel/" + idEmpresaPadre + "/" + listaIds, {}, this.httpOptions);
  }

  //eliminar
  public EliminarCliente(idCliente: number) {
    console.log("en service eliminar cliente", idCliente)
    return this.http.delete<MyResponse>(this.auxUrl + "api/Cliente/EliminarCliente/" + idCliente, this.httpOptions);
  }

  public obtenerCliente(idCliente: number){
    console.log('en get Cliente: ', idCliente);

    return this.http.get<Cliente>(this.auxUrl + "api/Cliente/ObtenerCliente/" + idCliente, this.httpOptions);
  }

  public obtenerContactosPorIdCliente(idCliente: number) {
    console.log('en get Cliente: ', idCliente);

    return this.http.get<Contacto[]>(this.auxUrl + "api/Cliente/ObtenerContactosPorCliente/" + idCliente, this.httpOptions);
  }

  public obtenerClienteHijoPorIdPadre(idCliente: number) {
    console.log('en get Cliente: ', idCliente);

    return this.http.get<Cliente[]>(this.auxUrl + "api/Cliente/ObtenerClienteHijoPorIdPadre/" + idCliente, this.httpOptions);
  }

 }


