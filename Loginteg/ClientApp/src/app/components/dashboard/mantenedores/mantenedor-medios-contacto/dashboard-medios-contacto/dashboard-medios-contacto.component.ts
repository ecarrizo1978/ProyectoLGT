import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartamentoService } from '../../../../../services/departamento.service';
import { MedioContacto } from '../../../../../interfaces/shared';
import { MediosContactoService } from '../../../../../services/medios-contacto.service';
import { CrearMediosContactoComponent } from '../crear-medios-contacto/crear-medios-contacto.component';
import { EditarMediosContactoComponent } from '../editar-medios-contacto/editar-medios-contacto.component';

@Component({
  selector: 'app-dashboard-medios-contacto',
  templateUrl: './dashboard-medios-contacto.component.html',
  styleUrls: ['./dashboard-medios-contacto.component.css']
})
export class DashboardMediosContactoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaDepartamento!: MedioContacto[];

  displayedColumns: string[] = ['nombre', 'esactivo', 'fechacreacion', 'acciones'];

  dataSource = new MatTableDataSource<any>();

  showData: boolean = false;

  constructor(private dialog: MatDialog, private mediosContactoService: MediosContactoService, private ref: ChangeDetectorRef, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMediosContacto()
  }


  getMediosContacto() {
    this.mediosContactoService.GetMediosContacto().subscribe(data => {

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


  openCrearMediosContacto() {
    this.dialog.open(CrearMediosContactoComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {
      this.getMediosContacto();
    })
  }

  openEditarMediosContacto(row: any) {
    this.dialog.open(EditarMediosContactoComponent, {
      data: row, //se debe mandar al componente hijo
      width: '60%'
    }).afterClosed().subscribe(val => {
      this.getMediosContacto();
    })
  }

  openEliminarMediosContacto(row: any) {

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
        this.mediosContactoService.EliminarMediosContacto(row.id).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Medio de contacto eliminado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.mediosContactoService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('No se puede eliminar el medio de contacto porque un contacto lo tiene asignado. ', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }

          this.getMediosContacto();

        }, error => {

          this._snackBar.open('Error al eliminar el medio de contacto ', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

        });

      }
    });


  }

}
