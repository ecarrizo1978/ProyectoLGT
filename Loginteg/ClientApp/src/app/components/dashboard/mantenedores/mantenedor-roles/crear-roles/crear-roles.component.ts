import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../../interfaces/shared';
import { MantenedorRolesService } from '../../../../../services/mantenedor-roles.service';
import { ActivatedRoute } from '@angular/router';
import { Menu, NewMenu, NewMenuEdit } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-roles',
  templateUrl: './crear-roles.component.html',
  styleUrls: ['./crear-roles.component.css']
})
export class CrearRolesComponent implements OnInit {
  crearRolForm!: FormGroup;
  public listaMenus!: NewMenuEdit[];
  public permisosGuardar!: number[];
  public emailFormArray!: number[];
  IsChecked = true;

  constructor(@Inject(MAT_DIALOG_DATA) public saveData: any, private dialogRef: MatDialogRef<CrearRolesComponent>, private mantenedorRolesService: MantenedorRolesService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.crearRolForm = this.fb.group({
      rol: ['', Validators.required],
      activo: ['', Validators.required],
      menus: this.fb.array([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {

        this.mantenedorRolesService.GetMenusActivos().subscribe(data => {
          for (let j = 0; j < data.length; j++) {
              data[j].isChecked = false;
          }
          this.listaMenus = data;

        }, error => console.log('error al llamar al shared service ', error));

      }
    )
    this.emailFormArray = [];
  }

  onChange(idMenu: number, isChecked: any) {
    const checkArray: FormArray = this.crearRolForm.get('menus') as FormArray;
    if (isChecked.currentTarget.checked) {
      this.emailFormArray.push(idMenu);
      checkArray.push(new FormControl(idMenu));
    } else {
      let index = this.emailFormArray.findIndex(x => x == idMenu)
      var arr = this.arrayRemove(this.emailFormArray, index);
      this.emailFormArray = Array.from(arr);

      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == idMenu) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  arrayRemove(arr: any[], value: number) {
    var arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      if (i != value)
        arr2.push(arr[i]);
    }
    return arr2;
  }

  volver() {
    this.crearRolForm.reset();
    this.dialogRef.close();
  }
 
  guardarRol() {
    this.crearRolForm.controls['rol'].value;
    this.crearRolForm.controls['activo'].value;
    this.emailFormArray.join(",");
    const fecha = new Date();

    const rol: Rol = {
      id: 0,
      descripcion: this.crearRolForm.controls['rol'].value,
      esActivo: this.crearRolForm.controls['activo'].value,
      fechaRegistro: fecha.toString(),
      menuAccess: this.emailFormArray.join(",")
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.crearRolForm.valid) {
      this.mantenedorRolesService.agregarRol(rol).subscribe({
          next: (res) => {
            if (res.success > 0) {

              this._snackBar.open('Rol agregado exitosamente', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
              this.crearRolForm.reset();
              //actualizar lista
              this.mantenedorRolesService.disparadorLista.emit({
                data: true
              });

              this.dialogRef.close('guardar');
            }
          },
          error: () => {
            // alert("error al agregar kla tarea");
            this._snackBar.open('error al agregar la el Rol', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }          
        })
      this.crearRolForm.reset();
      this.dialogRef.close();
      //redirect to table
    }

    
    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
