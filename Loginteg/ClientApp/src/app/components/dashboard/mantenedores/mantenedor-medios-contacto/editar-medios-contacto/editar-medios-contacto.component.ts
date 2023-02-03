import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MantenedorRolesService } from '../../../../../services/mantenedor-roles.service';
import { ActivatedRoute } from '@angular/router';
import { NewMenuEdit } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediosContactoService } from '../../../../../services/medios-contacto.service';
import { MedioContacto } from '../../../../../interfaces/shared';

@Component({
  selector: 'app-editar-medios-contacto',
  templateUrl: './editar-medios-contacto.component.html',
  styleUrls: ['./editar-medios-contacto.component.css']
})
export class EditarMediosContactoComponent implements OnInit {
  public listaMediosContacto!: MedioContacto[];
  editarMediosContactoForm!: FormGroup;
  public listaMenus!: NewMenuEdit[];
  public dataMedioscontacto!: MedioContacto;
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  public arrMenus!: number[];
  IsChecked = true;

  get ordersFormArray() {
    return this.editarMediosContactoForm.controls.menus as FormArray;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<EditarMediosContactoComponent>, private mediosContactoService: MediosContactoService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar, private ref: ChangeDetectorRef) {
    this.editarMediosContactoForm = this.fb.group({
      mediosContacto: ['', Validators.required],
      activo: ['', Validators.required],
      id: ['', Validators.required],
      menus: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {


        this.getDatosMediosContacto();

      }
    )

    this.emailFormArray = [];
  }

  getDatosMediosContacto() {
    this.mediosContactoService.GetDatosMediosContacto().subscribe(data => {

      this.dataMedioscontacto = data;
      this.editarMediosContactoForm.controls['mediosContacto'].setValue(this.editData.nombre);
      this.editarMediosContactoForm.controls['activo'].setValue(this.editData.esActivo);
      this.editarMediosContactoForm.controls['id'].setValue(this.editData.id);

    }, error => console.log('error al llamar al shared service ', error));
  }

  volver() {
    this.editarMediosContactoForm.reset();
    this.dialogRef.close();
  }

  guardarMediosContacto() {
    this.editarMediosContactoForm.controls['mediosContacto'].value;
    this.editarMediosContactoForm.controls['activo'].value;
    this.emailFormArray.join(",");
    const fecha = new Date();

    const cargos: MedioContacto = {
      id: this.editarMediosContactoForm.controls['id'].value,
      nombre: this.editarMediosContactoForm.controls['mediosContacto'].value,
      esActivo: this.editarMediosContactoForm.controls['activo'].value,
      fechaCreacion: fecha.toString()
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.editarMediosContactoForm.valid) {
      this.mediosContactoService.editarMediosContacto(cargos).subscribe({
        next: (res) => {
          if (res.success > 0) {

            this._snackBar.open('Medio de contacto editado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.editarMediosContactoForm.reset();
            //actualizar lista
            this.mediosContactoService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('error al editar medio de contacto', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.editarMediosContactoForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
