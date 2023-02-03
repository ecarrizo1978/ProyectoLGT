import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../../interfaces/shared';
import { MantenedorRolesService } from '../../../../../services/mantenedor-roles.service';
import { ActivatedRoute } from '@angular/router';
import { NewMenuEdit } from '../../../../../interfaces/menu';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrls: ['./editar-roles.component.css']
})
export class EditarRolesComponent implements OnInit {
  public listaRoles!: Rol[];
  editarRolForm!: FormGroup;
  public listaMenus!: NewMenuEdit[];
  public dataRol!: Rol;
  public permisosGuardar!: number[];
  public emailFormArray!: any[];
  public arrMenus!: number[];
  IsChecked = true;

  //get ordersFormArray() {
  //  return this.editarRolForm.controls.menus as FormArray;
  //}

  constructor(@Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<EditarRolesComponent>, private mantenedorRolesService: MantenedorRolesService, private route: ActivatedRoute, private fb: FormBuilder, private _snackBar: MatSnackBar, private ref: ChangeDetectorRef) {
    this.editarRolForm = this.fb.group({
      rol: ['', Validators.required],
      activo: ['', Validators.required],
      idRol: ['', Validators.required],
      menus: this.fb.array([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {


        this.getDatosRol();
        this.getMenusActivosEdit();

      }
    )

    this.emailFormArray = [];
  }

  getDatosRol() {
    this.mantenedorRolesService.GetDatosRol().subscribe(data => {

      this.dataRol = data;
      this.editarRolForm.controls['rol'].setValue(this.editData.descripcion);
      this.editarRolForm.controls['activo'].setValue(this.editData.esActivo);
      this.editarRolForm.controls['idRol'].setValue(this.editData.id);

    }, error => console.log('error al llamar al shared service ', error));
  }

  getMenusActivosEdit() {
    this.mantenedorRolesService.GetMenusActivosEdit().subscribe(data => {
      const checkArray: FormArray = this.editarRolForm.get('menus') as FormArray;
      const arr = this.editData.menuAccess.split(",");
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (arr[i] == data[j].idMenu) {
            data[j].isChecked = true;
            this.emailFormArray.push(data[j].idMenu);

            checkArray.push(new FormControl(data[j].idMenu));
            //break;
          }
        }
      }
      this.listaMenus = data;
      //this.addCheckboxes();
      this.ref.detectChanges();
    }, error => console.log('error al llamar al shared service ', error));
  }

  onChange(idMenu: number, isChecked: any) {
    const checkArray: FormArray = this.editarRolForm.get('menus') as FormArray;
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

  //private addCheckboxes() {
  //  this.listaMenus.forEach((i: any) => {
  //    let index = this.emailFormArray.findIndex(x => x == i.idMenu)
  //    if (index != -1) {
  //      this.ordersFormArray.push(new FormControl(i.idMenu));
  //    }
  //  }
  //    );
  //}

  arrayRemove(arr: any[], value: number) {
    var arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      if (i != value)
        arr2.push(arr[i]);
    }
    return arr2;
  }

  volver() {
    this.editarRolForm.reset();
    this.dialogRef.close();
  }

  guardarRol() {
    this.editarRolForm.controls['rol'].value;
    this.editarRolForm.controls['activo'].value;
    this.emailFormArray.join(",");
    const fecha = new Date();

    const rol: Rol = {
      id: this.editarRolForm.controls['idRol'].value,
      descripcion: this.editarRolForm.controls['rol'].value,
      esActivo: this.editarRolForm.controls['activo'].value,
      fechaRegistro: fecha.toString(),
      menuAccess: this.emailFormArray.join(",")
      //fechaRegistro: now.toLocaleDateString() // 👉 8/29/2022 - llega a la bdd como YYYY-MM-DD
    }

    if (this.editarRolForm.valid) {
      this.mantenedorRolesService.editarRol(rol).subscribe({
        next: (res) => {
          if (res.success > 0) {
            //this.addCheckboxes();
            this.ref.detectChanges();
            this._snackBar.open('Rol editado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.editarRolForm.reset();
            //actualizar lista
            this.mantenedorRolesService.disparadorLista.emit({
              data: true
            });

            this.dialogRef.close('guardar');
          }
        },
        error: () => {
          // alert("error al agregar kla tarea");
          this._snackBar.open('error al editar el Rol', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
        }
      })
      this.editarRolForm.reset();
      this.dialogRef.close();
      //redirect to table
    }


    //this.mantenedorRolesService.GetMenusActivos().subscribe(data => {

    //  this.listaMenus = data;

    //}, error => console.log('error al llamar al shared service ', error));
  }
}
