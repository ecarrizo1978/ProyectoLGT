import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Tarea } from '../../../interfaces/tarea';
import { TareaService } from '../../../services/tarea.service';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { Pipe, PipeTransform } from '@angular/core';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  public idUsuarioSistema: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //nombres de columnas
  displayedColumns: string[] = ['nombre', 'descripcion','idUsuario',  'fechaInicio', 'fechaTermino', 'estado', 'acciones'];


  public listaTareas!: Tarea[];
  public listaTareas2!: Observable<Tarea[]>;

  dataSource = new MatTableDataSource<any>();
  showData: boolean = false;

  constructor(private ref: ChangeDetectorRef, private dialog: MatDialog, private tareaService: TareaService, private _snackBar: MatSnackBar) {

    this.getTareas(); //mostrar todas las tareas
    //this.idUsuarioSistema = Number(sessionStorage.getItem('idUsuarioSistema'));
    //console.log('this.idUsuarioSistema', this.idUsuarioSistema);

    //this.getTareasPorUsuario(this.idUsuarioSistema);
  }


  ngOnInit(): void {

    this.tareaService.disparadorLista.subscribe(data => {
      

      if (data) {
        this.getTareas();
        //this.getTareasPorUsuario(this.idUsuarioSistema);
      }

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.listaTareas.slice();
    if (!sort.active || sort.direction === '') {
      this.listaTareas = data;
      return;
    }
  }


  applyFilter(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(CrearTareaComponent, {
      //datos
      width: '40%',
    }).afterClosed().subscribe(val => {
      if (val === 'guardar') {
        this.getTareas();
      }
    })
  }

  editarTarea(row: any) {
    this.dialog.open(CrearTareaComponent, {
      width: '30%',
      data: row //se debe mandar al componente hijo
    }).afterClosed().subscribe(val => {
      if (val === 'actualizar') {
        this.getTareas();
      }
    })
  }

  public getTareas() {
    //como observable
    this.tareaService.ListarTareas().subscribe(data => {
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


  public getTareasPorUsuario(idUsuario: number) {
    //como observable
    this.tareaService.ListarTareasPorUsuario(idUsuario).subscribe(data => {
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


  eliminarTarea(row: any) {

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

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {

        //llamada a servicio
        this.tareaService.EliminarTarea(row.idTarea).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Tarea eliminada exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.tareaService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('Error al eliminar la Tarea :( ', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }

           this.tareaService.disparadorLista.emit({
                data: true
           });

        }, error => {

          this._snackBar.open('Error al eliminar la Tarea :( ', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

        });

      }
    });
  }



}
