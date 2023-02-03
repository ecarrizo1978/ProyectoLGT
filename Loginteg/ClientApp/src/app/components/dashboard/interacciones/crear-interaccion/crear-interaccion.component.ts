import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl, } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactoService } from '../../../../services/contacto.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SharedService } from '../../../../services/shared.service';
import { Contacto } from '../../../../interfaces/contacto';
import { MedioContacto } from '../../../../interfaces/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../../../interfaces/cliente';
import { Interaccion } from '../../../../interfaces/interaccion';
import { InteraccionService } from '../../../../services/interaccion.service';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-crear-interaccion',
  templateUrl: './crear-interaccion.component.html',
  styleUrls: ['./crear-interaccion.component.css']
})
export class CrearInteraccionComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef ;
  fileAttr = 'Choose File';

  public rutaArchivo: string = "../../../assets/files/";
  public nombreArchivo: string = "";
  public idInteraccion: number = 0;
  tipoSolicitudes: any[] = [];
  solicitudes: any[] = [];

  actionBtn: string = "Agregar";
  interaccionesForm!: FormGroup;

  public idUsuarioSistema: number = 0;

  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private interaccionService: InteraccionService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private router: Router,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearInteraccionComponent>) {

    //form contacto
    this.interaccionesForm = this.fb.group({
      emisor: ['', Validators.required],
      tipoSolicitud: ['', Validators.required],
      solicitud: ['', Validators.required],
      glosa: ['', ],
    });

    //llenar combos
    this.getTipoSolicitudes();
    this.getSolicitudes();


    this.idUsuarioSistema = Number(sessionStorage.getItem('idUsuarioSistema'));

  }

  ngOnInit(): void {

  }

  public onResponseFile(answer: any) {
   
    //this.rutaArchivo = "http://localhost:5167/Resources/Files/"; //cambiar a ruta dinamica
    var URI = environment.servidor + ':' + environment.puerto + '/';

    this.rutaArchivo = URI + 'Resources/Files/'; //ksandoval 13-10
    this.nombreArchivo = answer;

  }

  agregarInteraccion() {

    const now = new Date();

    const interaccion: Interaccion = {
      id: this.idInteraccion,
      nombreEmisor: this.interaccionesForm.value.emisor ,
      tipoSolicitud: this.interaccionesForm.value.tipoSolicitud,
      solicitud: this.interaccionesForm.value.solicitud,
      idUsuario: this.idUsuarioSistema, //id del Usuario logueado en sistema
      fechaCreacion: "",
      fechaActualizacion: "",
      glosa: this.interaccionesForm.value.glosa,
      urlArchivo: this.rutaArchivo,
      nombreArchivo: this.nombreArchivo,
      idContacto: 0,
      idOrdenTrabajo : 0
      //el id del cliente se actualiza mediante SP
    }


      if (this.interaccionesForm.valid) {

        console.log('antes de service: ', interaccion);

        this.interaccionService.AgregarInteraccion(interaccion).subscribe({
          next: (res) => {

            if (res.success > 0) {

              this._snackBar.open('Interacción agregado exitosamente', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
              this.interaccionesForm.reset();

              //actualizar lista
              this.interaccionService.disparadorLista.emit({
                data: true
              });

              this.dialogRef.close('agregar');//valor se utiliza en el metodo afterClosed del componente padre


            } else {

              this._snackBar.open('Error al agregar la Interacción 1', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
            }

          },
          error: () => {
            this._snackBar.open('Error al agregar la Interacción 2', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }
        });

      }


  }


  onSelect(id: number): void {
    console.log('el codigo medio contacto front: ', id);
  }


  public getTipoSolicitudes() {
    this.sharedService.getMediosDeContacto().subscribe(data => {

      this.tipoSolicitudes = data;

    }, error => console.log('error al llamar al shared service ', error));
  }

  public getSolicitudes() {
    this.sharedService.getMediosDeContacto().subscribe(data => {

      this.solicitudes = data;

    }, error => console.log('error al llamar al shared service ', error));
  }




}
