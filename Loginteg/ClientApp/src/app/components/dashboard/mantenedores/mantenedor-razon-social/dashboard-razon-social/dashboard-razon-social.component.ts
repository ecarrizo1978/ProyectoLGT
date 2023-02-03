import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RazonSocial } from '../../../../../interfaces/razonSocial';
//import { CrearRolesComponent } from '../crear-roles/crear-roles.component';
//import { EditarRolesComponent } from '../editar-roles/editar-roles.component';
import { ChangeDetectorRef } from '@angular/core';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RazonSocialService } from '../../../../../services/razonSocial.service';
import { CrearRazonSocialComponent } from '../crear-razon-social/crear-razon-social.component';
import { EditarRazonSocialComponent } from '../editar-razon-social/editar-razon-social.component';


@Component({
  selector: 'app-dashboard-razon-social',
  templateUrl: './dashboard-razon-social.component.html',
  styleUrls: ['./dashboard-razon-social.component.css']
})
export class DashboardRazonSocialComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaRoles!: RazonSocial[];

  displayedColumns: string[] = ['descripcion', 'esactivo', 'fechacreacion', 'acciones'];

  dataSource = new MatTableDataSource<any>();

  showData: boolean = false;

  constructor(private dialog: MatDialog, private razonSocialService: RazonSocialService, private ref: ChangeDetectorRef, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getRazonSocial()
  }


  getRazonSocial() {
    this.razonSocialService.GetRazonSocial().subscribe(data => {

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


  openCrearRazonSocial() {
    this.dialog.open(CrearRazonSocialComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {
      this.getRazonSocial();
    })
  }

  openEditarRazonSocial(row: any) {
    this.dialog.open(EditarRazonSocialComponent, {
      data: row, //se debe mandar al componente hijo
      width: '60%'
    }).afterClosed().subscribe(val => {
      this.getRazonSocial();
    })
  }

  openEliminarRazonSocial(row: any) {

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
        this.razonSocialService.EliminarRazonSocial(row.id).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Rol eliminado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.razonSocialService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('No se puede eliminar el rol porque un usuario lo tiene asignado. ', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }

          this.getRazonSocial();

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
