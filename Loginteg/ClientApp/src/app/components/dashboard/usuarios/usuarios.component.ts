import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../interfaces/usuario';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { map, Observable } from 'rxjs';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //provisorio, esto debe venir del servicio.getUsuarios
  public listaUsuarios!: Usuario[];
  public listaUsuarios2!: Observable<Usuario[]>;

  displayedColumns: string[] = [
    'nombre',
    'rut',
    'jefaturaNombre',
    'rolNombre',
    'direccion',
    'telefono',
    'departamentoNombre',
    'correoCorporativo',
    'acciones'];

  dataSource = new MatTableDataSource<any>();
  showData: boolean = false;

  constructor(private ref: ChangeDetectorRef, private dialog: MatDialog, protected usuarioService: UsuarioService, private _snackBar: MatSnackBar) {

    this.getUsuarios();

  }

  ngOnInit(): void {

    this.usuarioService.disparadorLista.subscribe(data => {
      console.log(data);

      if (data) {
        this.getUsuarios();
      }

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.listaUsuarios.slice();
    if (!sort.active || sort.direction === '') {
      this.listaUsuarios = data;
      return;
    }
  }


  applyFilter(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }


  openDialog() {
    this.dialog.open(CrearUsuarioComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {
        this.getUsuarios();   
    })
  }


  public getUsuarios() {
    this.usuarioService.GetUsuarios().subscribe(data => {
   
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


  editarUsuario(row: any) {


    this.dialog.open(CrearUsuarioComponent, {
      width: '60%',
      data: row //se debe mandar al componente hijo
    }).afterClosed().subscribe(val => {
        this.getUsuarios();
    });

  }

  eliminarUsuario(row: any) {

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

/*    console.log('metodo eliminarUsuario ::row: ', row);*/

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        //llamada a servicio
          this.usuarioService.EliminarUsuario(row.idUsuario).subscribe(data => {

            if (data.success > 0) {

              this._snackBar.open('Usuario eliminado exitosamente', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });

            } else {

              this._snackBar.open('Error al eliminar el Usuario :( ', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });

            }
    
            this.getUsuarios();

          }, error => {

            this._snackBar.open('Error al eliminar el Usuario :( ', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          });

      }
    });
  }

}
