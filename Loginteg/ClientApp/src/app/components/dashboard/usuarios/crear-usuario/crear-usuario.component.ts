import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Usuario } from '../../../../interfaces/usuario';
import { SharedService } from '../../../../services/shared.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  public rutaFoto: string = "../../../assets/images/";
  public nombreFoto: string = "team.png";
  public idUsuario: number = 0;
  tipoRoles: any[] = [];
  form!: FormGroup;
  actionBtn: string = "Guardar";
  //send data to father component
  ingresoContacto: string = '';
  public fotoPerfil: string = '';
  @Output() responseContactoOK: EventEmitter<any> = new EventEmitter();


  //para los combo select

  roles: any[] = [];


  jefaturas: any[] = [];


  departamentos: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearUsuarioComponent>  ) {


    this.form = this.fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      jefatura: [''],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern]],
      departamento: ['', Validators.required],
      rol: ['', Validators.required],
      correoCorporativo: ['', [Validators.required, Validators.pattern]],
      correoPersonal: ['', [Validators.required, Validators.pattern]],
      clave: ['', Validators.required],
      confirmarclave: ['', Validators.required],
    },
    {
        // Used custom form validator name
        validator: ValidaRut("rut")
      }
    );

    //cargar combos
    this.getRoles();
    this.getJefaturas();
    this.getDepartamentos();

  }

  ngOnInit(): void {
    //....
     //....
     //....
     //....
     //....
     //....
     //....
       //.......SE DEBE GENERAR TABLA USUARIO EN BDD CON TIPO DE DATO INT
       //....
     //....
     //....
    //..........VERIFICAR CONVERT TO INT32
    console.log('la fila a editar: ', this.editData);


    if (this.editData) {
      this.actionBtn = "Actualizar";

      this.idUsuario = this.editData.idUsuario;
      this.form.controls['nombre'].setValue(this.editData.nombre);
      this.form.controls['rut'].setValue(this.editData.rut);
      this.form.controls['jefatura'].setValue(Number(this.editData.jefatura));
      /* this.form.controls['cargo'].setValue(this.editData.cargo);*/
      this.form.controls['direccion'].setValue(this.editData.direccion);
      this.form.controls['telefono'].setValue(this.editData.telefono);
      this.form.controls['departamento'].setValue(Number(this.editData.departamento));
      this.form.controls['rol'].setValue(this.editData.idRol);
      this.form.controls['correoCorporativo'].setValue(this.editData.correoCorporativo);
      this.form.controls['correoPersonal'].setValue(this.editData.correoPersonal);

      this.fotoPerfil = this.editData.urlFoto + this.editData.nombreFoto;
      //seteo para actualizar
      this.rutaFoto = this.editData.urlFoto;
      this.nombreFoto = this.editData.nombreFoto;

      this.form.controls['clave'].clearValidators();
      this.form.controls['confirmarclave'].clearValidators();
    }

  }

  setValidadorsToRepeatPassword() {
    if (this.form.controls['clave'].value != "" && this.editData != null) {
      this.form.controls["confirmarclave"].setValidators([Validators.required, Validators.pattern(this.form.controls['clave'].value)]);

      
    } else if (this.form.controls['clave'].value == "" && this.editData != null) {
      this.form.controls['confirmarclave'].clearValidators();
    }
    this.form.controls['confirmarclave'].updateValueAndValidity();
  }

  get f() {
    return this.form.controls;
  }

  //metodo para agregar usuario, web service
  agregarUsuario() {

    const now = new Date();

    const user: Usuario = {
      id: this.idUsuario,
      nombre: this.form.value.nombre,
      rut: this.form.value.rut,
      jefatura: this.form.value.jefatura.toString(),
      cargo: "",
      direccion: this.form.value.direccion,
      telefono: this.form.value.telefono.toString(),
      departamento: this.form.value.departamento.toString(),
      idRol: this.form.value.rol,
      correoCorporativo: this.form.value.correoCorporativo,
      correoPersonal: this.form.value.correoPersonal,
      urlFoto: this.rutaFoto,
      nombreFoto: this.nombreFoto,
      clave: this.form.value.clave,
      esActivo: "1",
      fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (!this.editData) {

     

      if (this.form.valid) {

          console.log('this.form.valid:::aca:', this.form.value);
   
          this.usuarioService.agregarUsuario(user).subscribe({
            next: (res) => {

              if (res.success > 0) {

                this._snackBar.open('Usuario agregado exitosamente', '', {
                  duration: 1500,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });

                this.form.reset();
                //actualizar lista
                this.usuarioService.disparadorLista.emit({
                  data: true
                });

                this.dialogRef.close('guardar');

              } else {
                this._snackBar.open('Error al agregar el Usuario', '', {
                  duration: 1500,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                })
              }

            },
            error: () => {

              this._snackBar.open('Error al agregar el Usuario', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
            }
          });

        }

      } else {
        //editar
        console.log('llamada al service editar:', this.editData.idUsuario);
        this.usuarioService.EditarUsuario(user, this.editData.idUsuario).subscribe(data => {

          this._snackBar.open('Usuario actualizado exitosamente', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.form.reset();
          this.dialogRef.close('actualizar'); //valor se utiliza en el metodo afterClosed del componente padre
        }, error => {

          this._snackBar.open('Error al agregar el Usuario', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        });

        this.router.navigate(['/dashboard/usuarios']);
      }


      this.responseContactoOK.emit(this.ingresoContacto);
      this.dialogRef.close(this.ingresoContacto); //cuando se cierra
    }
   
  


  public onResponseImage(answer: any) {
    var URI = environment.servidor + ':' + environment.puerto + '/';



    this.rutaFoto = URI + 'Resources/Images/'; //ksandoval 13-10
    this.nombreFoto = answer;
    /*this.form.setValue({ fotoPerfil: answer })*/
  }


  public getRoles() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.sharedService.GetRoles().subscribe(data => {
      //console.log('data shared regiones: ', data);
      this.roles = data;

    }, error => console.log('error al llamar al shared service ', error));
  }


  public getJefaturas() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.sharedService.GetJefaturas().subscribe(data => {
      console.log('data getJefaturas: ', data);
      this.jefaturas = data;

    }, error => console.log('error al llamar al shared service ', error));
  }


  public getDepartamentos() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.sharedService.GetDepartamentos().subscribe(data => {
      //console.log('data shared regiones: ', data);
      this.departamentos = data;

    }, error => console.log('error al llamar al shared service ', error));
  }



  public getRolByID(idUsuario: number) {

    this.sharedService.GetInstitucionesPorIdContacto(idUsuario).subscribe(data => {

      this.roles = data;

    }, error => console.log('error al llamar al shared service ', error));
  }


  public findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
  volver() {
    this.form.reset();
    this.dialogRef.close();
  }

}
export function ValidaRut(
  controlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    if (control.errors && !control.errors.mustMatch) {
      return;
    }

    let re = /\./gi;

    var newRut = control.value.replace(re, "");

    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(newRut))
      return control.setErrors({ invalidRut: true });

    var tmp = newRut.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';

    var M = 0, S = 1, T = parseInt(rut);

    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;

    var dv = S ? S - 1 : 'k';

    if (dv == digv) {
      return control.setErrors(null);
    } else {
      return control.setErrors({ invalidRut: true });
    }

  };

}
