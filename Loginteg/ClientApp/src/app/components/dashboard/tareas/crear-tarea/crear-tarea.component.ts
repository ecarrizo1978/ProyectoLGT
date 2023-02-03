import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Tarea } from '../../../../interfaces/tarea';
import { TareaService } from '../../../../services/tarea.service';
import { UsuarioService } from '../../../../services/usuario.service';

import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {

  inputUsuarioFormControl = new FormControl({ value: null, disabled: false });
  nombreFormControl = new FormControl({ value: null, disabled: false });
  descripcionFormControl = new FormControl({ value: null, disabled: false });

  estados: any[] = [
    {
      id: 1,
      nombre : 'Completada'
    },
    {
      id: 2,
      nombre: 'En Curso'
    },
    {
      id: 3,
      nombre: 'Asignada'
    },
    {
      id: 4,
      nombre: 'Vencida'
    },
  ];

  public idTarea: number = 0;
  usuarios: any[] = [];
  tareaForm !: FormGroup;
  actionBtn: string = "Agregar";

  constructor(private fb: FormBuilder,
    private tareaService: TareaService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private router: Router,
    private _snackBar: MatSnackBar,
    public datepipe: DatePipe,
    protected usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<CrearTareaComponent>) {

    //formulario
    this.tareaForm = this.fb.group({
      nombre: [this.nombreFormControl, Validators.required],
      descripcion: [this.descripcionFormControl, Validators.required],
      idUsuario: this.inputUsuarioFormControl,
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      estado: [''],
    });


    //llenar combos
    this.GetUsuarios();

  }

  ngOnInit(): void {

    if (this.editData) {
      this.actionBtn = "Actualizar";
      console.log('la fila a editar: ', this.editData);

      var ini = this.editData.fechaInicio;
      var fin = this.editData.fechaTermino;

      this.idTarea = this.editData.idTarea;

      this.nombreFormControl.setValue(this.editData.nombre);
      this.tareaForm.controls['nombre'].setValue(this.editData.nombre);
      console.log("this.tareaForm.controls['nombre']",this.tareaForm.controls['nombre'].value)
      this.nombreFormControl.disable();

      //deshabilitar cambio de usuario
      this.inputUsuarioFormControl.setValue(this.editData.idUsuario);
      this.tareaForm.controls['idUsuario'].setValue(this.editData.idUsuario);
      this.inputUsuarioFormControl.disable();

      this.descripcionFormControl.setValue(this.editData.descripcion);
      this.tareaForm.controls['descripcion'].setValue(this.editData.descripcion);
      this.descripcionFormControl.disable();

      //seteo de fechas nuevo 11-10
      this.tareaForm.controls['fechaInicio'].setValue(new Date(this.editData.fechaInicio));
      this.tareaForm.controls['fechaTermino'].setValue(new Date(this.editData.fechaTermino));
      this.tareaForm.controls['estado'].setValue(this.editData.estado.trim());
    }

  }


  agregarTarea() {

    console.log('inicio agregarTarea');
    const tarea: Tarea = {
      id: this.idTarea,
      nombre: this.nombreFormControl.value,
      //descripcion: this.tareaForm.value.descripcion.value,
      descripcion: this.descripcionFormControl.value,
      //idUsuario: this.tareaForm.value.idUsuario,
      idUsuario: this.inputUsuarioFormControl.value,
      fechaInicio: this.tareaForm.value.fechaInicio,
      fechaTermino: this.tareaForm.value.fechaTermino,
      estado: this.tareaForm.value.estado,
    }

    console.log('tarea objeto',tarea);

    if (!this.editData) {
      if (this.tareaForm.valid) {
        this.tareaService.AgregarTarea(tarea).subscribe({
          next: (res) => {
            
            if (res.success > 0) {
              this._snackBar.open('Tarea agregada exitosamente', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
              this.tareaForm.reset();

              //actualizar lista
              this.tareaService.disparadorLista.emit({
                data: true
              });

              this.dialogRef.close('agregar');//valor se utiliza en el metodo afterClosed del componente padre

            } else {

              this._snackBar.open('error al agregar la Tarea', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            }


          },
          error: () => {

            this._snackBar.open('error al agregar la Tarea', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
          }
        })
      }
    } else {
      //editar tarea
      console.log('llamada al service editar:', this.editData.idTarea);
      this.tareaService.actualizarTarea(tarea, this.editData.idTarea).subscribe(data => {
        console.log('data update: ', data);

        if (data.success > 0) {

          this._snackBar.open('Tarea actualizada exitosamente', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          this.tareaForm.reset();

          //actualizar lista
          this.tareaService.disparadorLista.emit({
            data: true
          });

          this.dialogRef.close('actualizar'); //valor se utiliza en el metodo afterClosed del componente padre


        } else {

          this._snackBar.open('Error al actualizar la Tarea', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }


      }, error => {
        // alert("error al agregar kla tarea");
        this._snackBar.open('Error al actualizar la Tarea', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      });

    }//fin else


  }//fin agregar tarea


  public GetUsuarios() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.usuarioService.GetUsuarios().subscribe(data => {

      this.usuarios = data;

    }, error => console.log('error al llamar al shared service ', error));
  }



  dateChangeHandler(evento: any) {
    var convertDate = new Date(evento.target.value).toISOString().substring(0, 10);
    console.log('la fecha seleccionada::date::', evento );

    this.tareaForm.controls['fechaInicio'].setValue(evento, {
      onlyself: true,
    });

  }
  


}
