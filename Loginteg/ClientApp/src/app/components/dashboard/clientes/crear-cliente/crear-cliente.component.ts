import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { RelacionarClienteComponent } from '../relacionar-cliente/relacionar-cliente.component';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SharedService } from '../../../../services/shared.service';
import { Cliente } from '../../../../interfaces/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrearContactoComponent } from '../../contactos/crear-contacto/crear-contacto.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { RazonSocial } from '../../../../interfaces/razonSocial';
import { RazonSocialService } from '../../../../services/razonSocial.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})


export class CrearClienteComponent implements OnInit {

  actionBtn: string = "Guardar";
  public idCliente: number = 0;
  //para capturar valor del combo hijo
  valueEmittedFromRelacionarComponent: number = 0;
   //para capturar valor del combo hijo

  //para capturar valor del multi hijo
  valueEmittedFromRelacionarMulti: any[] = [];
   //para capturar valor del multi hijo

  IdsEmpresasRelacionadas: number[] = [];

  clienteForm!: FormGroup;
  public rutaFoto: string = "../../../assets/images/";
  public nombreFoto: string = "team.png";
  tipoRazonSocial!: RazonSocial[]

  //para los combo select
  regionControl = new FormControl('', [Validators.required]);
  comunaControl = new FormControl('', [Validators.required]);
  //correoControl = new FormControl('bad@', Validators.compose([Validators.required, Validators.email]));
  //arreglos temporales, deben ser cambiados por el resutlado de la BDD
  regiones: any[] = [];
  comunas: any[] = [];

  //necesario para el chips
  separatorKeysCodes: number[] = [ENTER, COMMA];

  public fotoPerfil: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public editDataCliente: any, private dialog: MatDialog, private fb: FormBuilder, private clienteService: ClienteService, private router: Router, private sharedService: SharedService, private _snackBar: MatSnackBar, private dialogRef: MatDialogRef<CrearClienteComponent>, private razonSocialService: RazonSocialService) {
    this.clienteForm = this.fb.group({
      razonSocial: ['', Validators.required],
      rut: ['', Validators.required],
      tipoRSocialSelec: ['', Validators.required],
      regionSelect: ['', Validators.required],
      comunaSelect: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
    },
    {
      // Used custom form validator name
      validator: ValidaRut("rut")
    }
    );

    

    //CARGAR REGIONES
    this.getRegiones();
    this.getRazonSocial();

  }


  ngOnInit(): void {
    console.log('la fila a editar: ', this.editDataCliente);
    if (this.editDataCliente) {
      this.actionBtn = "Actualizar";
      this.idCliente = this.editDataCliente.idCliente;
      this.clienteForm.controls['razonSocial'].setValue(this.editDataCliente.razonSocial);
      this.clienteForm.controls['rut'].setValue(this.editDataCliente.rut);
      this.clienteForm.controls['tipoRSocialSelec'].setValue(this.editDataCliente.idRazonSocial);
      this.clienteForm.controls['regionSelect'].setValue(this.editDataCliente.idRegion);
      this.onSelect(this.editDataCliente.idRegion)
      this.clienteForm.controls['comunaSelect'].setValue(this.editDataCliente.idComuna);
      this.clienteForm.controls['direccion'].setValue(this.editDataCliente.direccion);
      this.clienteForm.controls['correo'].setValue(this.editDataCliente.correo);
      
      this.fotoPerfil = this.editDataCliente.urlFoto + this.editDataCliente.nombreFoto;
      //seteo para actualizar
      this.rutaFoto = this.editDataCliente.urlFoto;
      this.nombreFoto = this.editDataCliente.nombreFoto;
    }
  }

  get f() {
    return this.clienteForm.controls;
  }

  agregarCliente() {

    const now = new Date();
    var tipoEmpresaString = 'PADRE';

    const cliente: Cliente = {
      idCliente: this.idCliente,
      razonSocial: this.clienteForm.value.razonSocial,
      rut: this.clienteForm.value.rut,
      idTipoRazonSocial: this.clienteForm.value.tipoRSocialSelec,
      idRegion: this.clienteForm.value.regionSelect,
      idComuna: this.clienteForm.value.comunaSelect,
      direccion: this.clienteForm.value.direccion,
      telefono: this.clienteForm.value.telefonoContacto,
      nombreContacto1: this.clienteForm.value.nombreContacto1,
      nombreContacto2: this.clienteForm.value.nombreContacto2,
      correo: this.clienteForm.value.correo,
      urlFoto: this.rutaFoto,
      nombreFoto: this.nombreFoto,
      idEmpresaPadre: this.valueEmittedFromRelacionarComponent,
      tipoEmpresaRelacionada: tipoEmpresaString,
      activo: 1,
      idRazon_Social: this.clienteForm.value.tipoRSocialSelec
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (!this.editDataCliente) {

      if (this.clienteForm.valid) {

        console.log('valor de idEmpresaPadre en flujo relacionar:', this.valueEmittedFromRelacionarComponent);
        if (this.valueEmittedFromRelacionarComponent > 0) {
          tipoEmpresaString = 'HIJA';
        }

        cliente.tipoEmpresaRelacionada = tipoEmpresaString;

       
        if (cliente.nombreContacto1 == undefined) {
          cliente.nombreContacto1 = ""
        }
        if (cliente.nombreContacto2 == undefined) {
          cliente.nombreContacto2 = ""
        }


        this.clienteService.agregarClienteNew(cliente).subscribe({
          next: (res) => {

            //Service para agregan empresas hijas si corresponde
            if (this.IdsEmpresasRelacionadas.length > 0 && res.success > 0) {


              //servicio debe recibir la lista y el ID del ultimo cliente agregado...........
              var listaHijos: string = '';
              for (var value of this.IdsEmpresasRelacionadas) {
                listaHijos = listaHijos + value.toString() + ',';
              }
              //console.log('data listaHijos: ', listaHijos);

              //llamada a servicio
              console.log('antes de la llamada a actualizarEmpresasRel: params : ', res.success, ' :', listaHijos)
              this.clienteService.actualizarEmpresasRel(res.success, listaHijos).subscribe(data => {
                console.log('data vactualizarEmpresasRel: ', data);
              }, error => console.log(error))



            } else {
              //code....
            }


            this._snackBar.open('Cliente agregado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.clienteForm.reset();
            //actualizar lista
            this.clienteService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          },
          error: () => {
            // alert("error al agregar kla tarea");
            this._snackBar.open('error al agregar la el Cliente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }
        })
        this.clienteForm.reset();
        this.dialogRef.close();
        //redirect to table
  
        
      }

    } else {


      if (this.clienteForm.valid) {

        console.log('valor de idEmpresaPadre en flujo relacionar:', this.valueEmittedFromRelacionarComponent);
        if (this.valueEmittedFromRelacionarComponent > 0) {
          tipoEmpresaString = 'HIJA';
        }

        cliente.tipoEmpresaRelacionada = tipoEmpresaString;


        if (cliente.nombreContacto1 == undefined) {
          cliente.nombreContacto1 = ""
        }
        if (cliente.nombreContacto2 == undefined) {
          cliente.nombreContacto2 = ""
        }

        this.clienteService.editarCliente(cliente).subscribe({
          next: (res) => {

            //Service para agregan empresas hijas si corresponde
            if (this.IdsEmpresasRelacionadas.length > 0 && res.success > 0) {

              //servicio debe recibir la lista y el ID del ultimo cliente agregado...........
              var listaHijos: string = '';
              for (var value of this.IdsEmpresasRelacionadas) {
                listaHijos = listaHijos + value.toString() + ',';
              }
      
              //llamada a servicio
              console.log('antes de la llamada a actualizarEmpresasRel: params : ', res.success, ' :', listaHijos)
              this.clienteService.actualizarEmpresasRel(res.success, listaHijos).subscribe(data => {
                console.log('data vactualizarEmpresasRel: ', data);
              }, error => console.log(error))
            }


            this._snackBar.open('Cliente editado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.clienteForm.reset();
            this.dialogRef.close();
          },
          error: () => {
       
            this._snackBar.open('Error al actualizar el Cliente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }
        })

        
      }

    }

  }

 
  openDialog() {
    this.dialog.open(RelacionarClienteComponent, {
      //datos
      width: '50%',

    }).afterClosed().subscribe(val => {
      console.log('el tipo de dato que viene desde el metodo que cierra el dialog: ', typeof(val))

      if (typeof val === 'number') {
        //empresa padre
        this.valueEmittedFromRelacionarComponent = val;
        console.log('valueEmittedFromRelacionarComponent: ', this.valueEmittedFromRelacionarComponent);
        this.IdsEmpresasRelacionadas?.push(val);

      } else {
        //emrpesas hijas seleccionadas en el dialog
        this.valueEmittedFromRelacionarMulti = val;
        console.log('valueEmittedFromRelacionarMulti: ', this.valueEmittedFromRelacionarMulti);

        for (var value of this.valueEmittedFromRelacionarMulti) {
          console.log('en el for valueEmittedFromRelacionarMulti', value.idCliente);
          this.IdsEmpresasRelacionadas?.push(value.idCliente);
        }
          
      }

      //verificar arrays de ID para relacionar
      console.log('FINAL IdsEmpresasRelacionadas', this.IdsEmpresasRelacionadas);
      
    })
  }

  public onResponseImage(answer: any) {
    var URI = environment.servidor + ':' + environment.puerto + '/';

    // this.rutaFoto = "http://localhost:5167/Resources/Images/"; //cambiar a ruta dinamica

    this.rutaFoto = URI + 'Resources/Images/'; //ksandoval 13-10
    this.nombreFoto = answer;
  }

  getRazonSocial() {
    this.razonSocialService.GetRazonSocialActiva().subscribe(data => {
      this.tipoRazonSocial = data;

    });

  }


  public getRegiones() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.sharedService.GetRegiones().subscribe(data => {
      //console.log('data shared regiones: ', data);
      this.regiones = data;

    }, error => console.log('error al llamar al shared service ', error));
  }

  onSelect(region: number): void {
    console.log('el codigo de la region front: ', region);

    this.sharedService.GetComunaByIdRegion(region).subscribe(data => {
      /*console.log('data shared comuna by region: ', data);*/
      this.comunas = data;

    }, error => console.log('error al llamar al shared service ', error));
  } 


  //ultimo mockup 12-09-2022
  //ksandoval

  obj = {
    idCliente: this.editDataCliente != null ? this.editDataCliente.idCliente: null,
    isEdit: false
  }

  agregarContacto() {
    this.dialog.open(CrearContactoComponent, {
      //datos
      width: '60%',
      disableClose: true,
      //data: this.obj

    }).afterClosed().subscribe(val => {
      console.log('el tipo de dato que viene desde el metodo que cierra el dialog: ', typeof (val))

      if (typeof val === 'number') {
        //empresa padre
        this.valueEmittedFromRelacionarComponent = val;
        console.log('valueEmittedFromRelacionarComponent: ', this.valueEmittedFromRelacionarComponent);
        this.IdsEmpresasRelacionadas?.push(val);

      } else {
        //emrpesas hijas seleccionadas en el dialog
        this.valueEmittedFromRelacionarMulti = val;
        console.log('valueEmittedFromRelacionarMulti: ', this.valueEmittedFromRelacionarMulti);

        for (var value of this.valueEmittedFromRelacionarMulti) {
          console.log('en el for valueEmittedFromRelacionarMulti', value.idCliente);
          this.IdsEmpresasRelacionadas?.push(value.idCliente);
        }

      }

      //verificar arrays de ID para relacionar
      console.log('FINAL IdsEmpresasRelacionadas', this.IdsEmpresasRelacionadas);

    })
  }


  volver() {
    this.clienteForm.reset();
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
