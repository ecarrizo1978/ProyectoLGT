import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

//ksandoval 20-09
  form!: FormGroup;
  cargando!: boolean;
  public user!: Usuario; // esta variable contiene los datos para el hijo

  constructor(private router: Router, private _snackBar: MatSnackBar, private fb: FormBuilder, http: HttpClient, @Inject("BASE_URL") baseUrl: string, protected loginService: LoginService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  ingresar() {

    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    //this.user = { id: 0, nombre: "", correo: usuario, telefono: "", idRol: 0, urlFoto: "", nombreFoto: "", clave: password, esActivo: "1", fechaRegistro: "" }
    this.user = {
      id: 0,
      nombre: "",
      rut: "",
      jefatura: "",
      cargo: "",
      direccion: "",
      telefono: "",
      departamento: "",
      idRol: 0,
      correoCorporativo: usuario,
      correoPersonal: usuario,
      urlFoto: "",
      nombreFoto: "",
      clave: password,
      esActivo: "1",
      fechaRegistro: ""
    }
    this.loginService.logIn(this.user).subscribe(result => {
      
      if (result.success == 1) {

        console.log("resutl.Data == almacenar este usuario", result.data)

        sessionStorage.setItem('idUsuarioSistema', result.data.idUsuario);
        sessionStorage.setItem('nombreUsuario', result.data.nombre);
        sessionStorage.setItem('fotoPerfil', result.data.urlFoto + result.data.nombreFoto);
        sessionStorage.setItem('JWT', result.data.token);
        console.log("ruta imagen: ", result.data.urlFoto + result.data.nombreFoto)


        this.fakeLoading();
      } else {
        
        this.error();
      }
    })

  }

  error() {
    this._snackBar.open('Usuario y/o password invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  fakeLoading() {
    this.cargando = true;
    setTimeout(() => {
      //redirect to system home

      this.router.navigate(['dashboard'])

    }, 1500)
  }


}
