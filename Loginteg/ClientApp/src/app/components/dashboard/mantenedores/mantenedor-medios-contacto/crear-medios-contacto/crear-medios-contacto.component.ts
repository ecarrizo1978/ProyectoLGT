import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RazonSocialService } from '../../../../../services/razonSocial.service';
import { ActivatedRoute } from '@angular/router';
import { Menu, NewMenu } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediosContactoService } from '../../../../../services/medios-contacto.service';
import { MedioContacto } from '../../../../../interfaces/shared';


@Component({
  selector: 'app-crear-medios-contacto',
  templateUrl: './crear-medios-contacto.component.html',
  styleUrls: ['./crear-medios-contacto.component.css']
})
export class CrearMediosContactoComponent implements OnInit {
  crearMediosContactoForm!: FormGroup;
  public listaMenus!: NewMenu[];
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  IsChecked = true;

  constructor(@Inject(MAT_DIALOG_DATA) public saveData: any, private dialogRef: MatDialogRef<CrearMediosContactoComponent>, private mediosContactoService: MediosContactoService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.crearMediosContactoForm = this.fb.group({
      medioContacto: ['', Validators.required],
      activo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  volver() {
    this.crearMediosContactoForm.reset();
    this.dialogRef.close();
  }

  guardarMediosContacto() {
    this.crearMediosContactoForm.controls['medioContacto'].value;
    this.crearMediosContactoForm.controls['activo'].value;
    const fecha = new Date();

    const cargos: MedioContacto = {
      id: 0,
      nombre: this.crearMediosContactoForm.controls['medioContacto'].value,
      esActivo: this.crearMediosContactoForm.controls['activo'].value,
      fechaCreacion: fecha.toString()
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.crearMediosContactoForm.valid) {
      this.mediosContactoService.agregarMediosContacto(cargos).subscribe({
        next: (res) => {
          if (res.success > 0) {

            this._snackBar.open('Medio de contacto agregado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.crearMediosContactoForm.reset();
            //actualizar lista
            this.mediosContactoService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('Error al agregar el medio de contacto', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.crearMediosContactoForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
