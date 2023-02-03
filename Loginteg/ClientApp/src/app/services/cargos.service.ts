import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Cargos } from "../interfaces/cargos";
import { MyResponse } from "../interfaces/contacto";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CargosService {

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

  public GetCargos(): Observable<Cargos[]> {
    return this.http.get<Cargos[]>(this.auxUrl + "api/Mantenedor/ListaCargos", this.httpOptions);
  }
  public GetCargosActivos(): Observable<Cargos[]> {
    return this.http.get<Cargos[]>(this.auxUrl + "api/Mantenedor/ListaCargosActivos", this.httpOptions);
  }

  public GetDatosCargos(): Observable<Cargos> {
    return this.http.get<Cargos>(this.auxUrl + "api/Mantenedor/ObtenerDatosCargos", this.httpOptions);
  }

  public EliminarCargos(id: number) {
    console.log("en service eliminar cliente", id)
    return this.http.delete<MyResponse>(this.auxUrl + "api/Mantenedor/EliminarCargos/" + id, this.httpOptions);
  }

  public agregarCargos(razonSocial: Cargos) {
    console.log('en ClienteService agregarClienteNew: ', razonSocial);

    return this.http.post<MyResponse>(this.auxUrl + "api/Mantenedor/GuardarCargos", {
      'Id': razonSocial.id,
      'Descripcion': razonSocial.descripcion,
      'EsActivo': razonSocial.esActivo,
      'FechaCreacion': razonSocial.fechaCreacion
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }

  public editarCargos(razonSocial: Cargos) {
    console.log('en ClienteService agregarClienteNew: ', razonSocial);

    return this.http.put<MyResponse>(this.auxUrl + "api/Mantenedor/EditarCargos", {
      'Id': razonSocial.id,
      'Descripcion': razonSocial.descripcion,
      'EsActivo': razonSocial.esActivo,
      'FechaCreacion': razonSocial.fechaCreacion
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }
}


