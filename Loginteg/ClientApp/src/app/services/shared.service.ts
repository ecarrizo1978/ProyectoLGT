import { EventEmitter, Inject, Injectable, Output } from '@angular/core';
import { MyResponse } from '../interfaces/contacto';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tarea } from '../interfaces/tarea';
import { Comuna, Departamento, Institucion, MedioContacto, Region, Rol } from '../interfaces/shared';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

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

  //evaluar  interface
  public GetRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.auxUrl + "api/Cliente/GetRegiones", this.httpOptions);
  }

  public GetComunaByIdRegion(idRegion: number): Observable<Comuna[]> {
    console.log('el id region SharedService: ', idRegion);
    return this.http.get<Comuna[]>(this.auxUrl + "api/Cliente/GetComunaByRegion/" + idRegion, this.httpOptions);
  }

  //agregado 13-09
  public GetInstituciones(): Observable<Institucion[]>{
    return this.http.get<Institucion[]>(this.auxUrl + "api/Contacto/GetInstituciones", this.httpOptions);
  }

  public getMediosDeContacto(): Observable<MedioContacto[]> {
    return this.http.get<MedioContacto[]>(this.auxUrl + "api/Contacto/GetMediosDeContacto", this.httpOptions);
  }


  //agregado 01-10
  public GetInstitucionesPorIdContacto(idContacto: number): Observable<Institucion[]> {
    console.log('el id contacto GetInstitucionesPorIdContacto: ', idContacto);
    return this.http.get<Institucion[]>(this.auxUrl + "api/Contacto/GetInstitucionesPorIdContacto/" + idContacto, this.httpOptions);
  }


  //evaluar  interface
  public GetRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.auxUrl + "api/Usuario/GetRoles", this.httpOptions);
  }



  public GetJefaturas(): Observable<any[]> {
    return this.http.get<any[]>(this.auxUrl + "api/Usuario/GetJefaturas", this.httpOptions);
  }


  public GetDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.auxUrl + "api/Usuario/GetDepartamentos", this.httpOptions);
  }

  public GetDepartamentosPorIdJefaturas(idJefatura: number): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.auxUrl + "api/Usuario/GetDepartamentosPorIdJefaturas/" + idJefatura, this.httpOptions);
  }
}
