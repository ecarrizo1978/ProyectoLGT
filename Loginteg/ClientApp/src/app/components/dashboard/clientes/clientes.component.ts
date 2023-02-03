import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../../interfaces/cliente';
import { ClienteService } from '../../../services/cliente.service';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaclientes!: Cliente[];

  displayedColumns: string[] = ['razonSocial', 'rut', 'direccion', 'correo', 'idTipoRazonSocial', 'acciones'];

  dataSource = new MatTableDataSource<any>();
  showData: boolean = false;


  constructor(private ref: ChangeDetectorRef, protected clienteService: ClienteService, private dialog: MatDialog,private _snackBar: MatSnackBar) {

    this.getClientes();
  

  }

  ngOnInit(): void {

    this.clienteService.disparadorLista.subscribe(data => {
      console.log(data);

      if (data) {
        this.getClientes();
      }

    });
  
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


  public getClientes() {
    //como observable
    this.clienteService.GetClientes().subscribe(data => {

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


  eliminarCliente(row: any) {

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
        this.clienteService.EliminarCliente(row.idCliente).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Cliente eliminado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.clienteService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('Error al eliminar el Cliente :( ', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }

          this.getClientes();

        }, error => {

          this._snackBar.open('Error al eliminar el Cliente :( ', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

        });

      }
    });


  }


  openDialog() {
    this.dialog.open(CrearClienteComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {     
        this.getClientes();     
    })
  }


  editarCliente(row: any) {
    this.dialog.open(CrearClienteComponent, {
      width: '60%',
      data: row //se debe mandar al componente hijo
    }).afterClosed().subscribe(val => {
        this.getClientes();     
    });

  }

}
