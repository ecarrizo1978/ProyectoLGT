import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-relacionar-cliente',
  templateUrl: './relacionar-cliente.component.html',
  styleUrls: ['./relacionar-cliente.component.css']
})
export class RelacionarClienteComponent implements OnInit {

  //para capturar valor del combo hijo
  empresaPadreFromChild: string = '';

  parentEventHandlerCombo(event: string) {
    this.empresaPadreFromChild = event;
  }
   //para capturar valor del combo hijo


  //para capturar valor del combo MULTI hijo
  empresasHijasFromChild: any[] = [];

  parentEventHandlerMulti(event: any) {
    this.empresasHijasFromChild = event;
  }
  //para capturar valor del combo MULTI hijo


  //ingreso de contacto valido - ksandoval
  ingresoContactoFromChild: string = '';

  parentEventHandlerContacto(event: string) {
    this.ingresoContactoFromChild = event;
  }
    //ingreso de contacto valido - ksandoval


  //send data to father component
  @Output() responseRelacionar: EventEmitter<any> = new EventEmitter();



  //arreglos temporales, deben ser cambiados por el resutlado de la BDD
  public empresasPadre: Cliente[] = [];
  public empresasHijas: Cliente[] = [];


  tipoEmpresa!: string;
  relacionarForm !: FormGroup;
  inicioFormGroup = this._formBuilder.group({
    //firstCtrl: ['', Validators.required],
  });
  padreFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
  });
  hijaFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
  });
  isLinear = true; //true no deja avanzar al usuario




  constructor(private _formBuilder: FormBuilder, protected clienteService: ClienteService, private dialogRef: MatDialogRef<RelacionarClienteComponent>) {

    //cargar combos
    this.getEmpresas();
  }

  ngOnInit(): void {
    //this.getEmpresas();
  }

  relacionarEmpresa() {
    console.log("btn Guardar result relacionarEmpresa", this.empresaPadreFromChild);
    this.responseRelacionar.emit(this.empresaPadreFromChild);
    this.dialogRef.close(this.empresaPadreFromChild); //cuando se cierra


    //array de empresas hijas
    console.log("btn Guardar result empresasHijasFromChild", this.empresasHijasFromChild);

  }

  switchEmpresaPadre() {
    this.tipoEmpresa = "PADRE";
  }

  switchEmpresaHija() {
    this.tipoEmpresa = "HIJA";
  }

  public getEmpresas() {
    //como observable
    this.clienteService.GetClientes().subscribe(data => {
      console.log('data getEmpresas',data);
      this.empresasPadre = data;
      this.empresasHijas = data;
    }, error => console.log('error al llamar al clienteService en  RelacionarClienteComponent', error));
  }


}
