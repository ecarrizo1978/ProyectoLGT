import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../../interfaces/shared';
import { RazonSocialService } from '../../../../../services/razonSocial.service';
import { ActivatedRoute } from '@angular/router';
import { Menu, NewMenu } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RazonSocial } from '../../../../../interfaces/razonSocial';
import { CargosService } from '../../../../../services/cargos.service';
import { Cargos } from '../../../../../interfaces/cargos';

@Component({
  selector: 'app-crear-cargos',
  templateUrl: './crear-cargos.component.html',
  styleUrls: ['./crear-cargos.component.css']
})
export class CrearCargosComponent implements OnInit {
  crearCargosForm!: FormGroup;
  public listaMenus!: NewMenu[];
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  IsChecked = true;

  constructor(@Inject(MAT_DIALOG_DATA) public saveData: any, private dialogRef: MatDialogRef<CrearCargosComponent>, private cargosService: CargosService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.crearCargosForm = this.fb.group({
      cargo: ['', Validators.required],
      activo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  volver() {
    this.crearCargosForm.reset();
    this.dialogRef.close();
  }

  guardarCargos() {
    this.crearCargosForm.controls['cargo'].value;
    this.crearCargosForm.controls['activo'].value;
    const fecha = new Date();

    const cargos: Cargos = {
      id: 0,
      descripcion: this.crearCargosForm.controls['cargo'].value,
      esActivo: this.crearCargosForm.controls['activo'].value,
      fechaCreacion: fecha.toString()
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.crearCargosForm.valid) {
      this.cargosService.agregarCargos(cargos).subscribe({
        next: (res) => {
          if (res.success > 0) {

            this._snackBar.open('Cargo agregado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.crearCargosForm.reset();
            //actualizar lista
            this.cargosService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('Error al agregar el cargo', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.crearCargosForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
