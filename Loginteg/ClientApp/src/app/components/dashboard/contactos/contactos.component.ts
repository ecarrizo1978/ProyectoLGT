import { D } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contacto } from '../../../interfaces/contacto';
import { ContactoService } from '../../../services/contacto.service';
import { CrearContactoComponent } from './crear-contacto/crear-contacto.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public listaContactos!: Contacto[];
  //nombres de columnas
  displayedColumns: string[] = ['IdContacto', 'Nombre', 'Cargo', 'Telefono1', 'Telefono2', 'CorreoInstitucional', 'CorreoPersonal', 'Acciones'];


  dataSource = new MatTableDataSource<any>();
  showData: boolean = false;

  constructor(private ref: ChangeDetectorRef, private dialog: MatDialog, private contactoService: ContactoService, private _snackBar: MatSnackBar, private _liveAnnouncer: LiveAnnouncer) {

    this.getContactos();
    console.log('this.dataSource.data::contructor:' , this.dataSource.data);
  }

  ngOnInit(): void {

    this.contactoService.disparadorLista.subscribe(data => {
      console.log(data);

      if (data) {
        this.getContactos();
      }

    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(CrearContactoComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {
      if (val === 'guardar') {
        this.getContactos();
      }
    })
  }

  public getContactos() {
    //como observable
    this.contactoService.GetContactos().subscribe(data => {
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

    console.log('this.dataSource.data::getContactos:', this.dataSource.data);
  }

  editarContacto(row: any) {
    this.dialog.open(CrearContactoComponent, {
      width: '60%',
      data: row //se debe mandar al componente hijo
    }).afterClosed().subscribe(val => {
      if (val === 'actualizar') {
        this.getContactos();
      }
    })
  }

  eliminarContacto(row: any) {

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
        this.contactoService.EliminarContacto(row.idContacto).subscribe(data => {

          if (data.success > 0) {

            this._snackBar.open('Contacto eliminado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

            //actualizar lista
            this.contactoService.disparadorLista.emit({
              data: true
            });

          } else {

            this._snackBar.open('Error al eliminar el Contacto :( ', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });

          }


        }, error => {

          this._snackBar.open('Error al eliminar el Contacto :( ', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

        });

      }
    });
  }



}
