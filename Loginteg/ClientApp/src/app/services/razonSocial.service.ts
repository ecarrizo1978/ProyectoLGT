import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { MyResponse } from "../interfaces/contacto";
import { Menu, NewMenu, NewMenuEdit } from "../interfaces/menu";
import { RazonSocial } from "../interfaces/razonSocial";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RazonSocialService {

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

  public GetRazonSocial(): Observable<RazonSocial[]> {
    return this.http.get<RazonSocial[]>(this.auxUrl + "api/Mantenedor/ListaRazonSocial", this.httpOptions);
  }
  public GetRazonSocialActiva(): Observable<RazonSocial[]> {
    return this.http.get<RazonSocial[]>(this.auxUrl + "api/Mantenedor/ListaRazonSocialActiva", this.httpOptions);
  }

  public GetDatosRazonSocial(): Observable<RazonSocial> {
    return this.http.get<RazonSocial>(this.auxUrl + "api/Mantenedor/ObtenerDatosRazonSocial", this.httpOptions);
  }

  public EliminarRazonSocial(id: number) {
    console.log("en service eliminar cliente", id)
    return this.http.delete<MyResponse>(this.auxUrl + "api/Mantenedor/EliminarRazonSocial/" + id, this.httpOptions);
  }

  public agregarRazonSocial(razonSocial: RazonSocial) {
    console.log('en ClienteService agregarClienteNew: ', razonSocial);

    return this.http.post<MyResponse>(this.auxUrl + "api/Mantenedor/GuardarRazonSocial", {
      'Id': razonSocial.id,
      'Descripcion': razonSocial.descripcion,
      'EsActivo': razonSocial.esActivo,
      'FechaCreacion': razonSocial.fechaCreacion
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }

  public editarRazonSocial(razonSocial: RazonSocial) {
    console.log('en ClienteService agregarClienteNew: ', razonSocial);

    return this.http.put<MyResponse>(this.auxUrl + "api/Mantenedor/EditarRazonSocial", {
      'Id': razonSocial.id,
      'Descripcion': razonSocial.descripcion,
      'EsActivo': razonSocial.esActivo,
      'FechaCreacion': razonSocial.fechaCreacion
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }
}


