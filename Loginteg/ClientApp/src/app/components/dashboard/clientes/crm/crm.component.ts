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




@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  idCliente!: number;
  clienteSelected!: Cliente;
  clienteForm !: FormGroup;
  cards = [
    { title: 'Equipo 1', subtitle: '01/02/2022', content: 'Contenido 1' },
    { title: 'Equipo 2', subtitle: '01/02/2022', content: 'Contenido  2' },
    { title: 'Equipo 3', subtitle: '01/02/2022', content: 'Contenido  3' },
    { title: 'Equipo 4', subtitle: '01/02/2022', content: 'Contenido  4' },
    //{ title: 'Title 5', content: 'Content 5' },
    //{ title: 'Title 6', content: 'Content 6' },
    //{ title: 'Title 7', content: 'Content 7' },
    //{ title: 'Title 7', content: 'Content 8' },
  ];
  cardsSolicitudes = [
    { title: 'Solicitud 1', subtitle: '01/02/2022', content: 'Contenido 1' },
    { title: 'Solicitud 2', subtitle: '01/02/2022', content: 'Contenido  2' },
    { title: 'Solicitud 3', subtitle: '01/02/2022', content: 'Contenido  3' },
    { title: 'Solicitud 4', subtitle: '01/02/2022', content: 'Contenido  4' },
    //{ title: 'Title 5', content: 'Content 5' },
    //{ title: 'Title 6', content: 'Content 6' },
    //{ title: 'Title 7', content: 'Content 7' },
    //{ title: 'Title 7', content: 'Content 8' },
  ];

  logoCliente!: string;
  autonomia!: string;
  constructor(private route: ActivatedRoute, protected clienteService: ClienteService, private fb: FormBuilder) {

    this.clienteForm = this.fb.group({
      nombre: [''],
      rut: [''],
      direccion: [''],
      institucion: [''],
      contactos: [''],
      nombreContacto: [''],
      correo: [''],
    })


  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.idCliente = params["idCliente"]
        console.log("DetalleClienteComponent this.idCliente", this.idCliente)
        this.clienteService.obtenerCliente(this.idCliente).subscribe(data => {
          console.log("cliente obtenido >>", data)
          this.clienteForm.get('nombre')?.setValue(data.razonSocial)
          this.clienteForm.get('direccion')?.setValue(data.direccion)
          this.clienteForm.get('rut')?.setValue(data.rut)
          this.clienteForm.get('institucion')?.setValue('institucion')
          this.clienteForm.get('contactos')?.setValue(data.telefono.toString())
          this.clienteForm.get('nombreContacto')?.setValue(data.nombreContacto1 + "," + data.nombreContacto2)
          this.clienteForm.get('correo')?.setValue(data.correo)

          this.logoCliente = data.urlFoto + data.nombreFoto;
          
        })

      }
    )
  }

  ngAfterViewInit() {

  }




}
