import { Injectable , Inject} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Menu,NewMenu } from '../interfaces/menu';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  baseUrl!: string;
  auxUrl!: string;
  result!: number;

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

  //Llamada segun datos de menus de la bdd
  public ListarMenus(idRol: number): Observable<NewMenu[]> {
    return this.http.get<NewMenu[]>(this.auxUrl + "api/Mantenedor/ListarMenus/" + idRol, this.httpOptions);
  }

  public async ObtenerPermisoMenuPorCliente(paginaAccion: string, idRol: number): Promise<number> {
    this.result = await this.http.get<number>(this.auxUrl + "api/Mantenedor/ObtenerPermisoMenuPorCliente/" + encodeURIComponent(paginaAccion) + "/" + idRol, this.httpOptions).toPromise().then(resp => resp as number);

    return this.result;
  }

}
