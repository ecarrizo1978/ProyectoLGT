import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { MyResponse } from "../interfaces/contacto";
import { Menu, NewMenu, NewMenuEdit } from "../interfaces/menu";
import { RazonSocial } from "../interfaces/razonSocial";
import { Departamento } from "../interfaces/shared";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DepartamentoService {

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

  public GetDepartamento(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.auxUrl + "api/Mantenedor/ListaDepartamentos", this.httpOptions);
  }
  public GetDepartamentoActivo(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.auxUrl + "api/Mantenedor/ListaDepartamentoActivo", this.httpOptions);
  }

  public GetDatosDepartamento(): Observable<Departamento> {
    return this.http.get<Departamento>(this.auxUrl + "api/Mantenedor/ObtenerDatosDepartamentos", this.httpOptions);
  }

  public EliminarDepartamento(id: number) {
    console.log("en service eliminar cliente", id)
    return this.http.delete<MyResponse>(this.auxUrl + "api/Mantenedor/EliminarDepartamentos/" + id, this.httpOptions);
  }

  public agregarDepartamento(departamento: Departamento) {
    console.log('en ClienteService agregarClienteNew: ', departamento);

    return this.http.post<MyResponse>(this.auxUrl + "api/Mantenedor/GuardarDepartamentos", {
      'Id': departamento.id,
      'Nombre': departamento.nombre,
      'EsActivo': departamento.esActivo,
      'FechaCreacion': departamento.fechaCreacion,
      'IdJefatura': departamento.idJefatura
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }

  public editarDepartamento(departamento: Departamento) {
    console.log('en ClienteService agregarClienteNew: ', departamento);

    return this.http.put<MyResponse>(this.auxUrl + "api/Mantenedor/EditarDepartamentos", {
      'Id': departamento.id,
      'Nombre': departamento.nombre,
      'EsActivo': departamento.esActivo,
      'FechaCreacion': departamento.fechaCreacion,
      'IdJefatura': departamento.idJefatura
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }
}


