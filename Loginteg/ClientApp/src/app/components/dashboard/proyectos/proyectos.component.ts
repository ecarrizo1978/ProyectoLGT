import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../../interfaces/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { ProyectoService } from '../../../services/proyecto.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaclientes!: Cliente[];

  displayedColumns: string[] = ['idProyecto','nombre','descripcion','ejecutivo', 'acciones'];

  dataSource = new MatTableDataSource<any>();
  showData: boolean = false;
  public idCliente: number = 0;

  constructor(private route: ActivatedRoute,private ref: ChangeDetectorRef, protected proyectoService: ProyectoService, private dialog: MatDialog,private _snackBar: MatSnackBar) {

    /*this.getProyectos();*/
  

  }

  ngOnInit(): void {
    console.log("oninit")
    this.route.queryParams.subscribe(
      params => {
        this.idCliente = params["idCliente"]
        console.log("proyectooos id cliente params >> ",this.idCliente)
        this.getProyectos(this.idCliente);
        this.proyectoService.disparadorLista.subscribe(data => {
          console.log(data);

          if (data) {
            this.getProyectos(this.idCliente);
          }

        });
      })
    
    
  
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.listaclientes.slice();
    if (!sort.active || sort.direction === '') {
      this.listaclientes = data;
      return;
    }
  }


  applyFilter(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }


  public getProyectos(idCliente: number) {
    //como observable
    console.log("getProyectos >>>>", idCliente)
    this.proyectoService.obtenerProyectosCliente(idCliente).subscribe(data => {

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


  eliminarProyecto(row: any) {

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

    console.log('metodo eliminarPryoecto ::row: ', row);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.getProyectos(this.idCliente);
      if (confirmed) {

        //llamada a servicio
        this.proyectoService.EliminarProyecto(row.idProyecto).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Proyecto eliminado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.proyectoService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('Error al eliminar el Proyecto :( ', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }



        }, error => {

          this._snackBar.open('Error al eliminar el Proyectos :( ', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

        });

      }
    });


  }


  openDialog() {
    this.dialog.open(CrearProyectoComponent, {
      //datos
      width: '60%',
      data: { editdata: 'false', idCliente: this.idCliente }
    }).afterClosed().subscribe(val => {
        this.getProyectos(this.idCliente);      
    })
  }


  editarProyecto(row: any) {
    row.editdata = 'true';
    this.dialog.open(CrearProyectoComponent, {
      width: '60%',
      data: row //se debe mandar al componente hijo
    }).afterClosed().subscribe(val => {
        this.getProyectos(this.idCliente);
    });

  }

}
