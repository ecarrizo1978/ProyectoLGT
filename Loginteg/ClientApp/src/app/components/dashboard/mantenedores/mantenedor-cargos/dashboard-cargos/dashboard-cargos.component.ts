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
import { CrearCargosComponent } from '../crear-cargos/crear-cargos.component';
import { EditarCargosComponent } from '../editar-cargos/editar-cargos.component';
import { CargosService } from '../../../../../services/cargos.service';
import { Cargos } from '../../../../../interfaces/cargos';

@Component({
  selector: 'app-dashboard-cargos',
  templateUrl: './dashboard-cargos.component.html',
  styleUrls: ['./dashboard-cargos.component.css']
})
export class DashboardCargosComponent implements OnInit {



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaCargos!: Cargos[];

  displayedColumns: string[] = ['descripcion', 'esactivo', 'fechacreacion', 'acciones'];

  dataSource = new MatTableDataSource<any>();

  showData: boolean = false;

  constructor(private dialog: MatDialog, private cargosService: CargosService, private ref: ChangeDetectorRef, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCargos()
  }


  getCargos() {
    this.cargosService.GetCargos().subscribe(data => {

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


  openCrearCargos() {
    this.dialog.open(CrearCargosComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {
      this.getCargos();
    })
  }

  openEditarCargos(row: any) {
    this.dialog.open(EditarCargosComponent, {
      data: row, //se debe mandar al componente hijo
      width: '60%'
    }).afterClosed().subscribe(val => {
      this.getCargos();
    })
  }

  openEliminarCargos(row: any) {

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
        this.cargosService.EliminarCargos(row.id).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Cargo eliminado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.cargosService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('No se puede eliminar el cargo porque un contacto lo tiene asignado. ', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }

          this.getCargos();

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
