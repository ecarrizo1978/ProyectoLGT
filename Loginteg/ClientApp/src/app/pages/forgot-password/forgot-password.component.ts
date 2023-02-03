import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl, } from '@angular/forms';
import { Router } from '@angular/router';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;

  public user!: Usuario;

  constructor(private router: Router, private _snackBar: MatSnackBar, private dialog: MatDialog, private fb: FormBuilder, protected loginService: LoginService) {

    this.forgotForm = this.fb.group({

      correo: ['', Validators.required],

    });

  }

  ngOnInit(): void {
  }

  recuperar() {
    const usuario = this.forgotForm.value.correo;
    //this.user = { id: 0, nombre: "", correo: usuario, telefono: "", idRol: 0, urlFoto: "", nombreFoto: "", clave: "", esActivo: "1", fechaRegistro: "" }

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
      clave: "",
      esActivo: "1",
      fechaRegistro: ""
    }

    this.loginService.forgotPassword(this.user).subscribe(result => {
      console.log("resultado login >> ", result)

      if (result.success == 1) {

        this.fakeLoading();

      } else {
        console.log("false");
        this.error();
      }
    })

  }

  error() {
    this._snackBar.open('Usuario y/o password invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  fakeLoading() {

    this._snackBar.open('Correo enviado exitosamente! ', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

    setTimeout(() => {
      //redirect to system home
      this.router.navigate(['login']);

    }, 1500)
  }


}
