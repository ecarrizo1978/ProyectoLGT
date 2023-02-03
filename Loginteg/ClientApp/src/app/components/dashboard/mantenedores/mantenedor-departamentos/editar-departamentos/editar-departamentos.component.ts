import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NewMenuEdit } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentoService } from '../../../../../services/departamento.service';
import { Departamento } from '../../../../../interfaces/shared';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-editar-departamentos',
  templateUrl: './editar-departamentos.component.html',
  styleUrls: ['./editar-departamentos.component.css']
})
export class EditarDepartamentosComponent implements OnInit {
  public listaCargos!: Departamento[];
  editarDepartamentosForm!: FormGroup;
  public listaMenus!: NewMenuEdit[];
  public dataCargos!: Departamento;
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  public arrMenus!: number[];
  public jefaturas!: any[];
  IsChecked = true;

  get ordersFormArray() {
    return this.editarDepartamentosForm.controls.menus as FormArray;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<EditarDepartamentosComponent>, private departamentoService: DepartamentoService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar, private ref: ChangeDetectorRef, private sharedService: SharedService) {
    this.editarDepartamentosForm = this.fb.group({
      departamento: ['', Validators.required],
      activo: ['', Validators.required],
      id: ['', Validators.required],
      menus: new FormArray([]),
      jefatura: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {


        this.getDatosDepartamento();
        this.getJefaturas();

      }
    )

    this.emailFormArray = [];
  }

  public getJefaturas() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.sharedService.GetJefaturas().subscribe(data => {
      console.log('data getJefaturas: ', data);
      this.jefaturas = data;

    }, error => console.log('error al llamar al shared service ', error));
  }

  getDatosDepartamento() {
    this.departamentoService.GetDatosDepartamento().subscribe(data => {

      this.dataCargos = data;
      this.editarDepartamentosForm.controls['departamento'].setValue(this.editData.nombre);
      this.editarDepartamentosForm.controls['activo'].setValue(this.editData.esActivo);
      this.editarDepartamentosForm.controls['jefatura'].setValue(this.editData.idJefatura);
      this.editarDepartamentosForm.controls['id'].setValue(this.editData.id);

    }, error => console.log('error al llamar al shared service ', error));
  }

  volver() {
    this.editarDepartamentosForm.reset();
    this.dialogRef.close();
  }

  guardarDepartamentos() {
    this.editarDepartamentosForm.controls['departamento'].value;
    this.editarDepartamentosForm.controls['activo'].value;
    this.emailFormArray.join(",");
    const fecha = new Date();

    const cargos: Departamento = {
      id: this.editarDepartamentosForm.controls['id'].value,
      nombre: this.editarDepartamentosForm.controls['departamento'].value,
      esActivo: this.editarDepartamentosForm.controls['activo'].value,
      fechaCreacion: fecha.toString(),
      idJefatura: this.editarDepartamentosForm.controls['jefatura'].value,
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.editarDepartamentosForm.valid) {
      this.departamentoService.editarDepartamento(cargos).subscribe({
        next: (res) => {
          if (res.success > 0) {

            this._snackBar.open('Departamento editado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.editarDepartamentosForm.reset();
            //actualizar lista
            this.departamentoService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('error al editar es departamento', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.editarDepartamentosForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
