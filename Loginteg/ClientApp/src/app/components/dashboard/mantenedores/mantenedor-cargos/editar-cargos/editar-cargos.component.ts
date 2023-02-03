import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MantenedorRolesService } from '../../../../../services/mantenedor-roles.service';
import { ActivatedRoute } from '@angular/router';
import { NewMenuEdit } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RazonSocial } from '../../../../../interfaces/razonSocial';
import { RazonSocialService } from '../../../../../services/razonSocial.service';
import { Cargos } from '../../../../../interfaces/cargos';
import { CargosService } from '../../../../../services/cargos.service';

@Component({
  selector: 'app-editar-cargos',
  templateUrl: './editar-cargos.component.html',
  styleUrls: ['./editar-cargos.component.css']
})
export class EditarCargosComponent implements OnInit {
  public listaCargos!: Cargos[];
  editarCargosForm!: FormGroup;
  public listaMenus!: NewMenuEdit[];
  public dataCargos!: Cargos;
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  public arrMenus!: number[];
  IsChecked = true;

  get ordersFormArray() {
    return this.editarCargosForm.controls.menus as FormArray;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<EditarCargosComponent>, private cargosService: CargosService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar, private ref: ChangeDetectorRef) {
    this.editarCargosForm = this.fb.group({
      cargo: ['', Validators.required],
      activo: ['', Validators.required],
      id: ['', Validators.required],
      menus: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {


        this.getDatosCargos();

      }
    )

    this.emailFormArray = [];
  }

  getDatosCargos() {
    this.cargosService.GetDatosCargos().subscribe(data => {

      this.dataCargos = data;
      this.editarCargosForm.controls['cargo'].setValue(this.editData.descripcion);
      this.editarCargosForm.controls['activo'].setValue(this.editData.esActivo);
      this.editarCargosForm.controls['id'].setValue(this.editData.id);

    }, error => console.log('error al llamar al shared service ', error));
  }

  volver() {
    this.editarCargosForm.reset();
    this.dialogRef.close();
  }

  guardarCargos() {
    this.editarCargosForm.controls['cargo'].value;
    this.editarCargosForm.controls['activo'].value;
    this.emailFormArray.join(",");
    const fecha = new Date();

    const cargos: Cargos = {
      id: this.editarCargosForm.controls['id'].value,
      descripcion: this.editarCargosForm.controls['cargo'].value,
      esActivo: this.editarCargosForm.controls['activo'].value,
      fechaCreacion: fecha.toString()
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.editarCargosForm.valid) {
      this.cargosService.editarCargos(cargos).subscribe({
        next: (res) => {
          if (res.success > 0) {

            this._snackBar.open('Cargo editado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.editarCargosForm.reset();
            //actualizar lista
            this.cargosService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('error al editar es cargo', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.editarCargosForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
