import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';
import { Router } from "@angular/router";
import { Token } from '../interfaces/token';
import { MenuService } from '../services/menu.service';
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private _router: Router, private menuService: MenuService) { }
  public tokenInterface!: Token;
  public hasPermission!: number;
  public result!: number;
  ///// Method to check if user is authenticated (normal employees / non-admin)
  public isAuthenticated(): boolean {
    // Get token from localstorage
    const token = sessionStorage.JWT;

    // Check to see if token exists, if not return false
    if (!token) {
      return false;
    }

    // Decode token and get expiration date
    this.tokenInterface = jwt_decode(token);
    const date = this.tokenInterface.exp;
    // check if expiration is less than current time, if so return true
    if (date < Date.now()) {
      return true;
    } else {
      return false;
    }
  }
  public async hasMenuPermission(paginaAccion: string): Promise<boolean> {
    // Get token from localstorage
    const token = sessionStorage.JWT;

    // Check to see if token exists, if not return false
    if (!token) {
      return false;
    }

    // Decode token and get expiration date
    this.tokenInterface = jwt_decode(token);
    const idRol = this.tokenInterface.role;
    const paginaSplit = paginaAccion.split("?")[0];
    // check if expiration is less than current time, if so return true
    this.result = await this.menuService.ObtenerPermisoMenuPorCliente(paginaSplit, parseInt(idRol));

    if (this.result == 0)
      return false;

    return true;
  }
}
