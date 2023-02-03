import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NewMenu } from '../../../interfaces/menu';
import { MenuService } from '../../../services/menu.service';
import { delay, filter } from 'rxjs/operators';
//import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Usuario } from '../../../interfaces/usuario';
import { Observable } from 'rxjs';
import { Token } from '../../../interfaces/token';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public nombreUsuario
  public fotoPerfil
  public token
  isExpanded: boolean = false; //propiedad navbar
  //obtener menus dinamicos
  menuNuevo: NewMenu[] = [];

  user!: Usuario;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private menuService: MenuService, private observer: BreakpointObserver, private router: Router) {
    this.nombreUsuario = sessionStorage.getItem('nombreUsuario');
    this.fotoPerfil = sessionStorage.getItem('fotoPerfil');
    this.token = sessionStorage.JWT;
  }
  public tokenInterface!: Token;

  ngOnInit(): void {
    this.getMenus();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

  public getMenus() {
    // Decode token and get expiration date
    this.tokenInterface = jwt_decode(this.token);
    const idRol = this.tokenInterface.role;
    //webAPI to Controller to BD
    this.menuService.ListarMenus(parseInt(idRol)).subscribe(data => {
      console.log('data get menus: ', data);
      this.menuNuevo = data;
    })
  }

}
