import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departamento, Rol } from '../../../../../interfaces/shared';
import { RazonSocialService } from '../../../../../services/razonSocial.service';
import { ActivatedRoute } from '@angular/router';
import { Menu, NewMenu } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentoService } from '../../../../../services/departamento.service';
import { SharedService } from '../../../../../services/shared.service';

@Component({
  selector: 'app-crear-departamentos',
  templateUrl: './crear-departamentos.component.html',
  styleUrls: ['./crear-departamentos.component.css']
})
export class CrearDepartamentosComponent implements OnInit {
  crearDepartamentoForm!: FormGroup;
  public listaMenus!: NewMenu[];
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  public jefaturas!: any[];
  IsChecked = true;

  constructor(@Inject(MAT_DIALOG_DATA) public saveData: any, private dialogRef: MatDialogRef<CrearDepartamentosComponent>, private departamentoService: DepartamentoService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar, private sharedService: SharedService) {
    this.crearDepartamentoForm = this.fb.group({
      departamento: ['', Validators.required],
      activo: ['', Validators.required],
      jefatura: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getJefaturas();
  }

  public getJefaturas() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.sharedService.GetJefaturas().subscribe(data => {
      console.log('data getJefaturas: ', data);
      this.jefaturas = data;

    }, error => console.log('error al llamar al shared service ', error));
  }

  volver() {
    this.crearDepartamentoForm.reset();
    this.dialogRef.close();
  }

  guardarDepartamentos() {
    this.crearDepartamentoForm.controls['departamento'].value;
    this.crearDepartamentoForm.controls['activo'].value;
    const fecha = new Date();

    const cargos: Departamento = {
      id: 0,
      nombre: this.crearDepartamentoForm.controls['departamento'].value,
      esActivo: this.crearDepartamentoForm.controls['activo'].value,
      fechaCreacion: fecha.toString(),
      idJefatura: this.crearDepartamentoForm.controls['jefatura'].value
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.crearDepartamentoForm.valid) {
      this.departamentoService.agregarDepartamento(cargos).subscribe({
        next: (res) => {
          if (res.success > 0) {

            this._snackBar.open('Departamento agregado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.crearDepartamentoForm.reset();
            //actualizar lista
            this.departamentoService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('Error al agregar el deoartamento', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.crearDepartamentoForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
