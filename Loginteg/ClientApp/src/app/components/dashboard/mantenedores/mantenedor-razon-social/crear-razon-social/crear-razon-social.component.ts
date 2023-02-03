import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../../interfaces/shared';
import { RazonSocialService } from '../../../../../services/razonSocial.service';
import { ActivatedRoute } from '@angular/router';
import { Menu, NewMenu } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RazonSocial } from '../../../../../interfaces/razonSocial';

@Component({
  selector: 'app-crear-razon-social',
  templateUrl: './crear-razon-social.component.html',
  styleUrls: ['./crear-razon-social.component.css']
})
export class CrearRazonSocialComponent implements OnInit {
  crearRazonSocialForm!: FormGroup;
  public listaMenus!: NewMenu[];
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  IsChecked = true;
  constructor(@Inject(MAT_DIALOG_DATA) public saveData: any, private dialogRef: MatDialogRef<CrearRazonSocialComponent>, private razonSocialService: RazonSocialService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.crearRazonSocialForm = this.fb.group({
      razonSocial: ['', Validators.required],
      activo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  volver() {
    this.crearRazonSocialForm.reset();
    this.dialogRef.close();
  }

  guardarRazonSocial() {
    this.crearRazonSocialForm.controls['razonSocial'].value;
    this.crearRazonSocialForm.controls['activo'].value;
    const fecha = new Date();

    const rol: RazonSocial = {
      id: 0,
      descripcion: this.crearRazonSocialForm.controls['razonSocial'].value,
      esActivo: this.crearRazonSocialForm.controls['activo'].value,
      fechaCreacion: fecha.toString()
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.crearRazonSocialForm.valid) {
      this.razonSocialService.agregarRazonSocial(rol).subscribe({
        next: (res) => {
          if (res.success > 0) {

            this._snackBar.open('Razon Social agregada exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.crearRazonSocialForm.reset();
            //actualizar lista
            this.razonSocialService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('error al agregar la Razon Social', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.crearRazonSocialForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
