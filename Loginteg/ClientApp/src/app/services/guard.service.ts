import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, private _router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log(state.url)
    if (!this.auth.isAuthenticated()) {
      this._router.navigate(["login"]);
      return false;
    }
    var response = await this.auth.hasMenuPermission(state.url)
    if (!response) {
      this._router.navigate(["dashboard"]);
      return false;
    }

    return true;
  }
}
