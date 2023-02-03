import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm, FormControl, } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactoService } from '../../../../services/contacto.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SharedService } from '../../../../services/shared.service';
import { Contacto } from '../../../../interfaces/contacto';
import { Institucion, MedioContacto } from '../../../../interfaces/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../../../interfaces/cliente';
import { ReplaySubject, Subject, filter } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { ClienteService } from '../../../../services/cliente.service';
import { CargosService } from '../../../../services/cargos.service';

@Component({
  selector: 'app-crear-contacto',
  templateUrl: './crear-contacto.component.html',
  styleUrls: ['./crear-contacto.component.css']
})
export class CrearContactoComponent implements OnInit {



  instituciones: any[] = [
    {
      id: 1,
      nombre : "Municipalidad de Santiago"
    },
    {
      id: 2,
      nombre: "Hospital Metropolitabno"
    },
    {
      id: 3,
      nombre: "Registro Civil"
    }
  ];

  public idContacto: number = 0;
  cargos: any[] = [];
  IsChecked: boolean | undefined;
  actionBtn: string = "Agregar";
  contactoForm!: FormGroup;
  ingresoContacto: string = '';
  //send data to father component
  @Output() responseContactoOK: EventEmitter<any> = new EventEmitter();

 
  //nuevo prueba chips
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  /** control for the selected bank */
  public bankCtrl = new FormControl('');

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl = new FormControl('');
  /** list of banks filtered by search keyword */
  public filteredBanks: Cliente[] = [];
  public listaclientes!: Cliente[];
  filteredFruits!: Observable<Institucion[]>;
  fruits: Institucion[] = [];
  allFruits: any[] = [];
  @ViewChild('fruitInput') fruitInput!: ElementRef;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  private allowFreeTextAddEngineer = false;
  //nuevo prueba chips
  empresaPadreFromChild: string = '';

  parentEventHandlerCombo(event: string) {
    this.empresaPadreFromChild = event;
  }


  //para los combo select medio contacto
  medioContactoControl = new FormControl('', [Validators.required]);
  mediosContacto: MedioContacto[] = [];
  protected _onDestroy = new Subject<void>();

  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private contactoService: ContactoService,
    @Inject(MAT_DIALOG_DATA) public editDataContacto: any,
    private router: Router,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearContactoComponent>,
    protected clienteService: ClienteService,
    private cargosService: CargosService,
    private ref: ChangeDetectorRef,  ) {

    //form contacto
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      cargo: ['', Validators.required],
      telefono1: [''],
      telefono2: [''],
      correoInstitucional: ['', [Validators.pattern]],
      correoPersonal: ['', [Validators.pattern]],
      medioContactoSelect: ['', Validators.required],
      isEdit: [''],
      cliente: ['', Validators.required],
      esContactoPrincipal: ['']
    });
    
    this.IsChecked = false;
    //rellenar combos
    this.getInstituciones();
    this.getMediosDeContacto();
    this.getCargos();
    this.getClientes();


    //prueba chips
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: any | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));


  }

  ngOnInit() {
    
    if (this.editDataContacto != null) {
      this.actionBtn = "Actualizar";

      //obtener instituciones del contacto
      this.getInstitucionesPorIdContacto(this.editDataContacto.idContacto);
      this.idContacto = this.editDataContacto.idContacto;
      this.contactoForm.controls['nombre'].setValue(this.editDataContacto.nombre);
      this.contactoForm.controls['cargo'].setValue(this.editDataContacto.idCargo);
      this.contactoForm.controls['telefono1'].setValue(this.editDataContacto.telefono1);
      this.contactoForm.controls['telefono2'].setValue(this.editDataContacto.telefono2);
      this.contactoForm.controls['correoInstitucional'].setValue(this.editDataContacto.correoInstitucional);
      this.contactoForm.controls['correoPersonal'].setValue(this.editDataContacto.correoPersonal);
      this.contactoForm.controls['medioContactoSelect'].setValue(this.editDataContacto.idMedioContacto);
      this.contactoForm.controls['cliente'].setValue(this.editDataContacto.idCliente);
      this.contactoForm.controls['esContactoPrincipal'].setValue(this.editDataContacto.esContactoPrincipal);

      if (this.editDataContacto.esContactoPrincipal == 1) {
        this.IsChecked = true
      }


    }
    this.contactoForm.controls['isEdit'].setValue(false);
  }

  add(event: MatChipInputEvent): void {
    //debugger
    const inputt = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
    this.selectEngineerByName(value.trim());
    }
    //if ((value || '').trim()) {
    //  this.fruits.push({
    //    id: Math.random(),
    //    nombre: value.trim(),
    //    idComuna : 0
    //  });
    //}

    // Reset the input value
    if (inputt) {
      inputt.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: any): void {

    const index = this.fruits.indexOf(fruit);
    if (index >= 0) {
      this.fruits.splice(index, 1);

    }
    this.allFruits.push(fruit);
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: any | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

    let i: number = 0;
    this.allFruits.forEach((item: any) => {
      if (item.id == event.option.value.id) {
        this.allFruits.splice(i, 1);
        return;
      }
      i++;
    });
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: any | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    this.ref.detectChanges();
  }


  private _filter(value: any): any[] {
    return this.allFruits.filter((fruit: { nombre: string; }) => fruit.nombre.toLowerCase().includes(value.toLowerCase()));
  }

  private selectEngineerByName(engineerName: string) {
    let foundengineer = this.allFruits.filter(
      (engineer) => engineer.nombre == engineerName
    );
    if (foundengineer.length) {

      this.fruits.push(foundengineer[0]);
    } else {
      //
      // crear una Institucion, asignando un nuevo item más alto

      let highestemployeeid = Math.max(
        ...this.fruits.map((engineer) => engineer.id),
        0
      );

      let highestemployeeidComuna = Math.max(
        ...this.fruits.map((engineer) => engineer.idComuna),
        0
      );
      this.fruits.push({
        id: highestemployeeid + 1,
        nombre: engineerName,
        idComuna: highestemployeeidComuna + 1
      });
    }
  }



  agregarContacto() {


    var contactoPrincipal: number = 0;

    if (this.IsChecked) {
      contactoPrincipal = 1;
    }

    const contacto: Contacto = {
      idContacto: this.idContacto,
      nombre: this.contactoForm.value.nombre,
      cargo: "",
      telefono1: this.contactoForm.value.telefono1.toString(),
      telefono2: this.contactoForm.value.telefono2.toString(),
      correoInstitucional: this.contactoForm.value.correoInstitucional,
      correoPersonal: this.contactoForm.value.correoPersonal,
      idMedioContacto: this.contactoForm.value.medioContactoSelect,
      idCliente: this.contactoForm.value.cliente, //IT PROCESOS
      esContactoPrincipal: contactoPrincipal,
      idCargo: this.contactoForm.value.cargo
      //el id del cliente se actualiza mediante SP
    }

    console.log('obj contacto', contacto);
    console.log('instituciones seleccionadas:::', this.fruits);

    var listaInstituciones: string = '';
    var i = 0;
    for (var value of this.fruits) {
      if (i == this.fruits.length - 1) {
        listaInstituciones = listaInstituciones + value.id.toString();
      } else {
        listaInstituciones = listaInstituciones + value.id.toString() + ',';
      }
      i++
    }

    console.log('listaInstituciones IDS::: ', listaInstituciones);

    if (this.editDataContacto == null) {

      if (this.contactoForm.valid) {

        console.log('antes de service: ', contacto);

        this.contactoService.GuardarContacto(contacto).subscribe({
          next: (res) => {

            if (res.success > 0) {

              console.log('antes de la llamada a actualizarEmpresasRel: params : ', res.success, ' :', listaInstituciones);

              if (listaInstituciones.length > 0) {
                this.contactoService.GuardarInstitucionContactoREL(listaInstituciones, res.success).subscribe(data => {


                  if (data.success > 0) {

                    this._snackBar.open('Instituciones agregadas exitosamente', '', {
                      duration: 1500,
                      horizontalPosition: 'center',
                      verticalPosition: 'bottom'
                    });

                  } else {

                    this._snackBar.open('Error al agregar las instituciones', '', {
                      duration: 1500,
                      horizontalPosition: 'center',
                      verticalPosition: 'bottom'
                    });

                  }

                }, error => {

                  this._snackBar.open('Error al agregar las instituciones', error, {
                    duration: 1500,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom'
                  });

                });
              //END  GuardarInstitucionContactoREL
              }
          


              this._snackBar.open('Contacto agregado exitosamente', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
              this.contactoForm.reset();
              this.contactoService.disparadorLista.emit({
                data: true
              });
              this.dialogRef.close('agregar');

            } else {

              this._snackBar.open('Error al agregar el Contacto', '', {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              })
            }

          },
          error: () => {
            this._snackBar.open('Error al agregar el Contacto', '', {
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }
        });

      }


    } else {
       //editar
    
      this.contactoService.EditarContacto(contacto, this.editDataContacto.idContacto).subscribe(data => {
       

        if (data.success > 0) {

          if (listaInstituciones.length > 0) {
            this.contactoService.EditarInstitucionContactoREL(listaInstituciones, this.editDataContacto.idContacto).subscribe(data => {


              if (data.success > 0) {

                this._snackBar.open('Instituciones editadas exitosamente', '', {
                  duration: 1500,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });

              } else {

                this._snackBar.open('Error al editadas las instituciones', '', {
                  duration: 1500,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });

              }

            }, error => {

              this._snackBar.open('Error al editadas las instituciones', error, {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });

            });
            //END  GuardarInstitucionContactoREL
          } else {
            this.contactoService.BorrarInstitucionContactoREL(this.editDataContacto.idContacto).subscribe(data => {


              if (data.success > 0) {

                this._snackBar.open('Instituciones editadas exitosamente', '', {
                  duration: 1500,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });

              } else {

                this._snackBar.open('Error al editar las instituciones', '', {
                  duration: 1500,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom'
                });

              }

            }, error => {

              this._snackBar.open('Error al editar las instituciones', error, {
                duration: 1500,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });

            });
          }

          this._snackBar.open('Contacto actualizado exitosamente', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });

          this.contactoForm.reset();
          this.contactoService.disparadorLista.emit({
            data: true
          });
          this.dialogRef.close('actualizar'); //valor se utiliza en el metodo afterClosed del componente padre


        } else {

          this._snackBar.open('Error al actualizar el Contacto', '', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }


       
  
      }, error => {
        // alert("error al agregar kla tarea");
        this._snackBar.open('Error al actualizar la Contacto', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      });

      //this.router.navigate(['/dashboard/contactos']);
    }

 
    this.responseContactoOK.emit(this.ingresoContacto);
    this.dialogRef.close(this.ingresoContacto); //cuando se cierra

  }

  public getInstituciones() {

    this.sharedService.GetInstituciones().subscribe(data => {

      //this.allEngineers = data;
      this.allFruits = data;

    }, error => console.log('error al llamar al shared service ', error));
  }

  public getMediosDeContacto() {
    this.sharedService.getMediosDeContacto().subscribe(data => {

      this.mediosContacto = data;

    }, error => console.log('error al llamar al shared service ', error));
  }


  onSelect(id: number): void {
    console.log('el codigo medio contacto front: ', id);
  }


  //ks - 01-10
  public getInstitucionesPorIdContacto(idContacto: number) {

    this.sharedService.GetInstitucionesPorIdContacto(idContacto).subscribe(data => {
      let arrSplice = [];
     // console.log('valor this.instituciones in getInstitucionesPorIdContacto: ', data);
      this.fruits = data;
      for (let j = 0; j < this.fruits.length; j++) {
        this.allFruits.forEach((item, index) => {       
            if (this.fruits[j].id == item.id) {
              this.allFruits.splice(index, 1);
              return;
            }       
        });
      }

      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: any | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));


    }, error => console.log('error al llamar al shared service ', error));
  }

  changeEvent($event: any) {
    //console.log($event.checked);
    this.IsChecked = $event.checked;
    //$event.source.toggle();
    $event.source.focus();
  }

  volver() {
    this.contactoForm.reset();
    this.dialogRef.close();
  }


  public getCargos() {
    //get by service
    console.log('antes de la llamada a sharedService');
    this.cargosService.GetCargos().subscribe(data => {
      //console.log('data shared regiones: ', data);
      this.cargos = data;

    }, error => console.log('error al llamar al shared service ', error));
  }

  public getClientes() {
    this.clienteService.GetClientes().subscribe((data) => {

      this.listaclientes = data;

    });
  }




}
