import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectoService } from '../../../../services/proyecto.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SharedService } from '../../../../services/shared.service';
import { Cliente } from '../../../../interfaces/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrearContactoComponent } from '../../contactos/crear-contacto/crear-contacto.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyecto } from '../../../../interfaces/proyecto';
import { UsuarioService } from '../../../../services/usuario.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent implements OnInit {
  //this.editData.editdata == false : guardar
    //this.editData.editdata == true : editar

  actionBtn: string = "Guardar";
  public idProyecto: number = 0;
  //para capturar valor del combo hijo
  valueEmittedFromRelacionarComponent: number = 0;
   //para capturar valor del combo hijo

  //para capturar valor del multi hijo
  valueEmittedFromRelacionarMulti: any[] = [];
   //para capturar valor del multi hijo

  IdsEmpresasRelacionadas: number[] = [];

  proyectoForm!: FormGroup;
  public rutaFoto: string = "../../../assets/images/";
  public nombreFoto: string = "team.png";
  tipoRazonSocial: any[] = [
    { id: 1, descripcion: 'Autonomo' },
    { id: 2, descripcion: 'Dependiente' }
  ];


  //para los combo select
  inputUsuarioFormControl = new FormControl({ value: null, disabled: false });
  nombreFormControl = new FormControl({ value: null, disabled: false });
  descripcionFormControl = new FormControl({ value: null, disabled: false });

  //arreglos temporales, deben ser cambiados por el resutlado de la BDD
 
  usuarios: any[] = [];

  //necesario para el chips
  separatorKeysCodes: number[] = [ENTER, COMMA];

  public fotoPerfil: string = '';
  public idCliente: number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public editData: any,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private proyectoService: ProyectoService,
    private router: Router,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private dialogRef: MatDialogRef<CrearProyectoComponent>) {
    

    this.proyectoForm = this.fb.group({      
      
      idCliente: [''],
      nombre: [''],
      descripcion: [''],
      fechaCreacion: [''],      
    });
    

  }


  ngOnInit(): void {

    
    //this.editData.editdata == false : guardar
    //this.editData.editdata == true : editar
    
    this.idCliente = this.editData.idCliente
    this.proyectoForm.controls['idCliente'].setValue(this.editData.idCliente)
    this.GetUsuarios();
    if (this.editData.editdata == 'true') {      
      let var_fc = this.editData.fechaCreacion.split(' ')[0];
      let [month, day, year] = var_fc.split('-');
      const fechaCreacionAux = new Date(+year, +month - 1, +day);

      
      console.log('this.editData.idProyecto', this.editData.idProyecto)
      this.actionBtn = "Actualizar";

      this.idProyecto = this.editData.idProyecto;
      this.inputUsuarioFormControl.setValue(this.editData.idEjecutivoComercial)
      //this.proyectoForm.controls['idProyecto'].setValue(this.editData.idProyecto) 
      this.proyectoForm.controls['idCliente'].setValue(this.editData.idCliente)
      this.proyectoForm.controls['nombre'].setValue(this.editData.nombre)
      this.proyectoForm.controls['descripcion'].setValue(this.editData.descripcion)
      this.proyectoForm.controls['fechaCreacion'].setValue(fechaCreacionAux)
      
      
      

    }
  }

  agregarProyecto() {

    //this.editData.editdata == false : guardar
    //this.editData.editdata == true : editar
    if (this.editData.editdata == 'false') {
      const now = new Date();

      console.log('antes de service: ', this.proyectoForm);



      if (this.proyectoForm.valid) {



        const proyecto: Proyecto = {
          idProyecto: 0,
          idCliente: this.idCliente,
          nombre: this.proyectoForm.value.nombre,
          descripcion: this.proyectoForm.value.descripcion,
          fechaCreacion: this.proyectoForm.value.fechaCreacion,
          idEjecutivoComercial: this.inputUsuarioFormControl.value,

        }



        this.proyectoService.agregarProyectoNew(proyecto).subscribe({
          next: (res) => {
            this._snackBar.open('Proyecto agregado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.proyectoForm.reset();

          },
          error: () => {
            // alert("error al agregar kla tarea");
            this._snackBar.open('error al agregar la el Proyecto', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }
        })
        this.proyectoForm.reset();
        this.dialogRef.close();
        //redirect to table


      }

    } else {



      if (this.proyectoForm.valid) {
        console.log("luego de this.proyectoForm.valid :::: ", this.proyectoForm.value.idEjecutivoComercial)

        const proyecto: Proyecto = {
          idProyecto: this.idProyecto,
          idCliente: this.idCliente,
          nombre: this.proyectoForm.value.nombre,
          descripcion: this.proyectoForm.value.descripcion,
          fechaCreacion: this.proyectoForm.value.fechaCreacion,
          idEjecutivoComercial: this.inputUsuarioFormControl.value,

        }

        this.proyectoService.editarProyecto(proyecto).subscribe({
          next: (res) => {
            //console.log('el res agregarClienteNew, ID cliente creado: ', res);
            //console.log('this.IdsEmpresasRelacionadas.length', this.IdsEmpresasRelacionadas.length);



            this._snackBar.open('Proyecto editado exitosamente', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
            this.proyectoForm.reset();

          },
          error: () => {
            // alert("error al agregar kla tarea");
            this._snackBar.open('error al editar la el Proyecto', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }
        })

        //redirect to table

        this.router.navigate(["dashboard/proyectos"], { queryParams: { idCliente: this.idCliente } });
      }



    }

    }

  

  openDialog() {
    console.log("open dialog");
  }

  public onResponseImage(answer: any) {
    console.log("respuesta crear proyecto component: ", answer);
    this.rutaFoto = "http://40.122.66.66:5167/Resources/Images/";
    this.nombreFoto = answer;
  }




  onSelect(region: number): void {
    console.log("en onSelect")
  } 



  volver() {
    this.proyectoForm.reset();
    this.dialogRef.close();
  }

  public GetUsuarios() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.usuarioService.GetUsuarios().subscribe(data => {

      this.usuarios = data;

    }, error => console.log('error al llamar al shared service ', error));
  }
}
