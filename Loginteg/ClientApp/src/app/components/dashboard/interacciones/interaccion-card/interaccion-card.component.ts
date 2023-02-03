import { Component, Input, OnInit } from '@angular/core';
import { Interaccion } from '../../../../interfaces/interaccion';

@Component({
  selector: 'app-interaccion-card',
  templateUrl: './interaccion-card.component.html',
  styleUrls: ['./interaccion-card.component.css']
})
export class InteraccionCardComponent implements OnInit {

  nombreUsuarioSistema: string = "Eduardo";
  fechaCreacion: string = '';
  nombreEmisor: string = '';
  tipoSolicitud: string = '';
  solicitud: string = '';

  //viene del padre
  @Input() interaccion!: Interaccion;


  constructor() { }

  ngOnInit(): void {
  }

}
