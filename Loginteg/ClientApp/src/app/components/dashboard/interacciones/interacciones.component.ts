import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Interaccion } from '../../../interfaces/interaccion';
import { TareaService } from '../../../services/tarea.service';
import { Pipe, PipeTransform } from '@angular/core';
import { CrearInteraccionComponent } from './crear-interaccion/crear-interaccion.component';
import { InteraccionService } from '../../../services/interaccion.service';

@Component({
  selector: 'app-interacciones',
  templateUrl: './interacciones.component.html',
  styleUrls: ['./interacciones.component.css']
})
export class InteraccionesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //nombres de columnas
  displayedColumns: string[] = ['IdInteraccion', 'Emisor', 'Glosa', 'Acciones'];
  interacciones: any[] = [];
  showData: boolean = false;
  public listaInteraccion!: Interaccion[];
  public listaInteraccion2!: Observable<Interaccion[]>;



  constructor(private dialog: MatDialog, private interaccionService: InteraccionService, private _snackBar: MatSnackBar) {

    this.getHistorialInteracciones();
  }

  ngOnInit(): void {
    this.interaccionService.disparadorLista.subscribe(data => {
      console.log(data);

      if (data) {
        this.getHistorialInteracciones();
      }

    });
  }


  openDialog() {
    this.dialog.open(CrearInteraccionComponent, {
      //datos
      width: '60%',
    }).afterClosed().subscribe(val => {
      if (val === 'guardar') {
        this.getHistorialInteracciones();
      }
    })
  }



  public getHistorialInteracciones() {
    //como observable
    console.log('antes de listar historial');
    this.interaccionService.ListarHistorialInteraccion().subscribe(data => {

      if (data.length > 0) {
        this.showData = true;
        //llenar variable para mandarla al card
        this.interacciones = data
      } else {
        this.showData = false;
      }
    
    });
  }

}
