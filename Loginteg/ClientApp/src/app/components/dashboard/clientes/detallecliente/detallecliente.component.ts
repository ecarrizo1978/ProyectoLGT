import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearClienteComponent } from '../crear-cliente/crear-cliente.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { Contacto } from '../../../../interfaces/contacto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detallecliente.component.html',
  styleUrls: ['./detallecliente.component.css']
})

export class DetalleClienteComponent implements OnInit {
  idCliente!: number;
  clienteSelected!: Cliente;
  clienteForm !: FormGroup;
  arrDataS!: Array<Cliente>;
  arrDataC!: Array<Contacto>;
  arrDataD!: Array<Cliente>;
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Cliente>();
  @ViewChild('TableOnePaginator', { static: true }) tableOnePaginator!: MatPaginator;
  @ViewChild('TableOneSort', { static: true }) tableOneSort!: MatSort;
  dataSourceC = new MatTableDataSource<Contacto>();
  @ViewChild('TableTwoPaginator', { static: true }) tableTwoPaginator!: MatPaginator;
  @ViewChild('TableTwoSort', { static: true }) tableTwoSort!: MatSort;
  dataSourceD = new MatTableDataSource<Cliente>();
  @ViewChild('tableThreePaginator', { static: true }) tableThreePaginator!: MatPaginator;
  @ViewChild('tableThreeSort', { static: true }) tableThreeSort!: MatSort;
  displayedColumns: string[] = ['razonSocial', 'rut', 'idTipoRazonSocial', 'acciones'];
  displayedColumnsC: string[] = ['nombre', 'cargo', 'correoInstitucional', 'telefono1', 'esContactoPrincipal'/*, 'acciones'*/];
  displayedColumnsD: string[] = ['razonSocial', 'rut', 'idTipoRazonSocial'/*, 'acciones'*/];

  logoCliente!: string;


  constructor(private dialog: MatDialog,private route: ActivatedRoute, protected clienteService: ClienteService, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {

    this.clienteForm = this.fb.group({
      nombre: [''],
      rut: [''],
      direccion: [''],
      institucion: [''],
      contactos: [''],
      nombreContacto: [''],
      correo: [''],
      tipoEmpresa: [''],
      idRegion: [''],
      tipoRazonSocial: [''],
      contactoCount: [''],
      idRazonSocial: ['']
    })

   


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {

        this.idCliente = params["idCliente"];
        this.arrDataS = [];
        this.getClientesRelacionados(this.idCliente);
        console.log("DetalleClienteComponent this.idCliente" , this.idCliente)
        this.clienteService.obtenerCliente(this.idCliente).subscribe(data => {
          console.log("cliente obtenido >>", data)
          this.clienteForm.get('nombre')?.setValue(data.razonSocial)
          this.clienteForm.get('direccion')?.setValue(data.direccion)
          this.clienteForm.get('rut')?.setValue(data.rut)
          this.clienteForm.get('institucion')?.setValue('institucion')
          this.clienteForm.get('contactos')?.setValue(data.telefono.toString())
          this.clienteForm.get('nombreContacto')?.setValue(data.nombreContacto1 + "," + data.nombreContacto2)
          this.clienteForm.get('correo')?.setValue(data.correo)
          this.clienteForm.get('tipoEmpresa')?.setValue(data.tipoEmpresaRelacionada)
          this.clienteForm.get('idRegion')?.setValue(data.idRegion)
          this.clienteForm.get('tipoRazonSocial')?.setValue(data.idTipoRazonSocial)
          this.clienteForm.get('idRazonSocial')?.setValue(data.idRazon_Social)
          this.logoCliente = data.urlFoto + data.nombreFoto;
          console.log('logocliente', this.logoCliente);
          this.arrDataS.push(data)
          this.dataSource = new MatTableDataSource(this.arrDataS);
        })



          
      }
    )
    this.clienteService.obtenerContactosPorIdCliente(this.idCliente).subscribe(dataC => {
      this.arrDataC = dataC
      this.dataSourceC = new MatTableDataSource(this.arrDataC);
    })

    this.clienteService.obtenerClienteHijoPorIdPadre(this.idCliente).subscribe(dataD => {
      this.arrDataD = dataD
      this.dataSourceD = new MatTableDataSource(this.arrDataD);
    })
  }

  ngAfterViewInit() {
   
  }

  public getClientesRelacionados(idCliente: number ) {
    //como observable
    this.clienteService.GetClientesRelacionados(idCliente).subscribe(data => {
      console.log("get clientes relacionados dataaaa", data)
      this.dataSource.data = data;
      this.dataSource.paginator = this.tableOnePaginator;
      this.dataSource.sort = this.tableOneSort;
    });
  }

  eliminarCliente(cliente: Cliente) {
    cliente.idCliente = this.idCliente;
    this.clienteService.EliminarCliente(cliente.idCliente).subscribe(data => {
      console.log("data delete > ", data)
      this.getClientesRelacionados(this.idCliente);
      this._snackBar.open('Cliente eliminado exitosamente', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    })

    this.router.navigate(['/dashboard']);



  }



  //public getClientesAsociados() {
  //  //como observable
  //  this.clienteService.GetClientes().subscribe(data => {
  //    this.dataSource.data = data;
  //    this.dataSource.paginator = this.paginator;
  //    this.dataSource.sort = this.sort;
  //  });
  //}

  editarCliente(row: any) {

    row.idCliente = this.idCliente;
    this.dialog.open(CrearClienteComponent, {
      width: '60%',
      data: row //se debe mandar al componente hijo
    }).afterClosed().subscribe(val => {

      this.getClientesRelacionados(this.idCliente);
      
    });

  }


}
