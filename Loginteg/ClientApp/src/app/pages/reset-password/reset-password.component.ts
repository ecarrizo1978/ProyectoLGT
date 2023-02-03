import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form!: FormGroup;
  cargando!: boolean;
  public user!: Usuario; // esta variable contiene los datos para el hijo
  id!: number;
  correoPersonal !: string;

  inputFormControl = new FormControl({ value: null, disabled: true });

  constructor(private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, private fb: FormBuilder, http: HttpClient, @Inject("BASE_URL") baseUrl: string, protected loginService: LoginService) {
    this.form = this.fb.group({
      //usuario: ['', Validators.required,],
      password: ['', Validators.required],
    })

    this.inputFormControl.disable();

  }

  ngOnInit(): void {
    console.log('ngOnInit :: reset ::');
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      //console.log('this.id :: reset ::', this.id);

      this.correoPersonal = String(this.route.snapshot.paramMap.get('correo'));
      //console.log('correoPersonal :: reset ::', this.correoPersonal);
      this.inputFormControl.setValue(this.correoPersonal);

    })
  }

  actualizar() {
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
      correoCorporativo: this.inputFormControl.value,
      correoPersonal: this.inputFormControl.value,
      urlFoto: "",
      nombreFoto: "",
      clave: password,
      esActivo: "1",
      fechaRegistro: ""
    }
    this.loginService.ResetPassword(this.user).subscribe(result => {
      console.log("resultado ResetPassword >> ", result)
      if (result.success == 1) {
        console.log("resutl.Data == almacenar este usuario", result.data)

        this.fakeLoading();

      } else {
        console.log("false")

      }
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
