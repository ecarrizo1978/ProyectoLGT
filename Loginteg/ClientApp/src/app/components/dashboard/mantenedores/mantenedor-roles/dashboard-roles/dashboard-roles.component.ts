import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rol } from '../../../../../interfaces/shared';
import { CrearRolesComponent } from '../crear-roles/crear-roles.component';
import { EditarRolesComponent } from '../editar-roles/editar-roles.component';
import { MantenedorRolesService } from '../../../../../services/mantenedor-roles.service';
import { ChangeDetectorRef } from '@angular/core';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard-roles',
  templateUrl: './dashboard-roles.component.html',
  styleUrls: ['./dashboard-roles.component.css']
})
export class DashboardRoles implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaRoles!: Rol[];

  displayedColumns: string[] = ['descripcion', 'esactivo', 'fecharegistro', 'acciones'];

  dataSource = new MatTableDataSource<any>();

  showData: boolean = false;

  constructor(private dialog: MatDialog, private mantenedorRolesService: MantenedorRolesService, private ref: ChangeDetectorRef, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRoles()
  }


  getRoles() {
    this.mantenedorRolesService.GetRoles().subscribe(data => {

      if (data.length > 0) {
        console.log('entro al data.length');

        this.showData = true;
        console.log('paginator is ', this.paginator);
        this.dataSource = new MatTableDataSource(data);
        this.ref.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.showData = false;
      }

    });

  }

  applyFilter(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }


  openCrearRoles() {
    this.dialog.open(CrearRolesComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {
      this.getRoles();
    })
  }

  openEditarRoles(row: any) {
    this.dialog.open(EditarRolesComponent, {
      data: row, //se debe mandar al componente hijo
      width: '60%'
    }).afterClosed().subscribe(val => {
      this.getRoles();
    })
  }

  openEliminarRol(row: any) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Estás seguro de que quieres eliminar este registro?',
        buttonText: {
          ok: 'Guardar',
          cancel: 'No'
        }
      }
    });
    //const snack = this._snackBar.open('Snack bar open before dialog');

    console.log('metodo eliminarCliente ::row: ', row);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        //llamada a servicio
        this.mantenedorRolesService.EliminarRol(row.id).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Rol eliminado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.mantenedorRolesService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('No se puede eliminar el rol porque un usuario lo tiene asignado. ', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }

          this.getRoles();

        }, error => {

          this._snackBar.open('Error al eliminar el Rol ', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

        });

      }
    });


  }

}
