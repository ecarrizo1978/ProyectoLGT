import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Inject, Injectable, Output } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { MyResponse } from "../interfaces/contacto";
import { Menu, NewMenu, NewMenuEdit } from "../interfaces/menu";
import { MedioContacto } from "../interfaces/shared";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class MediosContactoService {

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

  public GetMediosContacto(): Observable<MedioContacto[]> {
    return this.http.get<MedioContacto[]>(this.auxUrl + "api/Mantenedor/ListaMediosContacto", this.httpOptions);
  }
  public GetMediosContactoActivo(): Observable<MedioContacto[]> {
    return this.http.get<MedioContacto[]>(this.auxUrl + "api/Mantenedor/ListaMediosContactoActivos", this.httpOptions);
  }

  public GetDatosMediosContacto(): Observable<MedioContacto> {
    return this.http.get<MedioContacto>(this.auxUrl + "api/Mantenedor/ObtenerDatosMediosContacto", this.httpOptions);
  }

  public EliminarMediosContacto(id: number) {
    console.log("en service eliminar cliente", id)
    return this.http.delete<MyResponse>(this.auxUrl + "api/Mantenedor/EliminarMediosContacto/" + id, this.httpOptions);
  }

  public agregarMediosContacto(mediosContacto: MedioContacto) {
    console.log('en ClienteService agregarClienteNew: ', mediosContacto);

    return this.http.post<MyResponse>(this.auxUrl + "api/Mantenedor/GuardarMediosContacto", {
      'Id': mediosContacto.id,
      'Nombre': mediosContacto.nombre,
      'EsActivo': mediosContacto.esActivo,
      'FechaCreacion': mediosContacto.fechaCreacion
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }

  public editarMediosContacto(mediosContacto: MedioContacto) {
    console.log('en ClienteService agregarClienteNew: ', mediosContacto);

    return this.http.put<MyResponse>(this.auxUrl + "api/Mantenedor/EditarMediosContacto", {
      'Id': mediosContacto.id,
      'Nombre': mediosContacto.nombre,
      'EsActivo': mediosContacto.esActivo,
      'FechaCreacion': mediosContacto.fechaCreacion
    }, this.httpOptions)

    //this.listaClientes.unshift();

  }
}


