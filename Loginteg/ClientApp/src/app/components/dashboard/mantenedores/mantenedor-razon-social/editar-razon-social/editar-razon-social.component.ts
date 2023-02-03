import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MantenedorRolesService } from '../../../../../services/mantenedor-roles.service';
import { ActivatedRoute } from '@angular/router';
import { NewMenuEdit } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RazonSocial } from '../../../../../interfaces/razonSocial';
import { RazonSocialService } from '../../../../../services/razonSocial.service';

@Component({
  selector: 'app-editar-razon-social',
  templateUrl: './editar-razon-social.component.html',
  styleUrls: ['./editar-razon-social.component.css']
})
export class EditarRazonSocialComponent implements OnInit {
  public listaRoles!: RazonSocial[];
  editarRazonSocialForm!: FormGroup;
  public listaMenus!: NewMenuEdit[];
  public dataRol!: RazonSocial;
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  public arrMenus!: number[];
  IsChecked = true;

  get ordersFormArray() {
    return this.editarRazonSocialForm.controls.menus as FormArray;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<EditarRazonSocialComponent>, private razonSocialService: RazonSocialService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar, private ref: ChangeDetectorRef) {
    this.editarRazonSocialForm = this.fb.group({
      razonSocial: ['', Validators.required],
      activo: ['', Validators.required],
      id: ['', Validators.required],
      menus: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {


        this.getDatosRazonSocial();

      }
    )

    this.emailFormArray = [];
  }

  getDatosRazonSocial() {
    this.razonSocialService.GetDatosRazonSocial().subscribe(data => {

      this.dataRol = data;
      this.editarRazonSocialForm.controls['razonSocial'].setValue(this.editData.descripcion);
      this.editarRazonSocialForm.controls['activo'].setValue(this.editData.esActivo);
      this.editarRazonSocialForm.controls['id'].setValue(this.editData.id);

    }, error => console.log('error al llamar al shared service ', error));
  }

  volver() {
    this.editarRazonSocialForm.reset();
    this.dialogRef.close();
  }

  guardarRazonSocial() {
    this.editarRazonSocialForm.controls['razonSocial'].value;
    this.editarRazonSocialForm.controls['activo'].value;
    this.emailFormArray.join(",");
    const fecha = new Date();

    const rol: RazonSocial = {
      id: this.editarRazonSocialForm.controls['id'].value,
      descripcion: this.editarRazonSocialForm.controls['razonSocial'].value,
      esActivo: this.editarRazonSocialForm.controls['activo'].value,
      fechaCreacion: fecha.toString()
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.editarRazonSocialForm.valid) {
      this.razonSocialService.editarRazonSocial(rol).subscribe({
        next: (res) => {
          if (res.success > 0) {

            this._snackBar.open('Rol editado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.editarRazonSocialForm.reset();
            //actualizar lista
            this.razonSocialService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('error al editar la Razon Social', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.editarRazonSocialForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
