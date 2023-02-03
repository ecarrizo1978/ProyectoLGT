import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentoService } from '../../../../../services/departamento.service';
import { Departamento } from '../../../../../interfaces/shared';
import { CrearDepartamentosComponent } from '../crear-departamentos/crear-departamentos.component';
import { EditarDepartamentosComponent } from '../editar-departamentos/editar-departamentos.component';

@Component({
  selector: 'app-dashboard-departamentos',
  templateUrl: './dashboard-departamentos.component.html',
  styleUrls: ['./dashboard-departamentos.component.css']
})
export class DashboardDepartamentosComponent implements OnInit {



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaDepartamento!: Departamento[];

  displayedColumns: string[] = ['nombre', 'esactivo', 'fechacreacion', 'acciones'];

  dataSource = new MatTableDataSource<any>();

  showData: boolean = false;

  constructor(private dialog: MatDialog, private departamentoService: DepartamentoService, private ref: ChangeDetectorRef, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDepartamentos()
  }


  getDepartamentos() {
    this.departamentoService.GetDepartamento().subscribe(data => {

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


  openCrearDepartamentos() {
    this.dialog.open(CrearDepartamentosComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {
      this.getDepartamentos();
    })
  }

  openEditarDepartamentos(row: any) {
    this.dialog.open(EditarDepartamentosComponent, {
      data: row, //se debe mandar al componente hijo
      width: '60%'
    }).afterClosed().subscribe(val => {
      this.getDepartamentos();
    })
  }

  openEliminarDepartamentos(row: any) {

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
        this.departamentoService.EliminarDepartamento(row.id).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Departamento eliminado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.departamentoService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('No se puede eliminar el departamento porque un usuario lo tiene asignado. ', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }

          this.getDepartamentos();

        }, error => {

          this._snackBar.open('Error al eliminar el departamento ', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

        });

      }
    });


  }

}
