import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Cliente } from '../../../../interfaces/cliente';
import { ClienteService } from '../../../../services/cliente.service';

export interface Empresa {
  id: string;
  name: string;
}


@Component({
  selector: 'app-combo-buscador2',
  templateUrl: './combo-buscador2.component.html',
  styleUrls: ['./combo-buscador2.component.css']
})
export class ComboBuscadorComponent2 implements OnInit, AfterViewInit, OnDestroy {

  @Input() empresasPadre!: Cliente[];
  //send data to father component
  @Output() responseCombo: EventEmitter<any> = new EventEmitter();


  /** control for the selected bank */
  public bankCtrl = new FormControl('');

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl = new FormControl('');




  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<any[]> = new ReplaySubject<Cliente[]>(1);

  @ViewChild('singleSelect', { static: true })
    singleSelect!: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private _formBuilder: FormBuilder, protected clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.GetClientes().subscribe((data) => {

      this.empresasPadre = data;
      // set initial selection
      //this.bankCtrl.setValue(this.empresasPadre[-1]);
      // load the initial bank list
      this.filteredBanks.next(this.empresasPadre.slice());

      // listen for search field value changes
      this.bankFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanks();
        });

    });


  }


  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {

        //se debe utlizar objeto que corresponde ......
        this.singleSelect.compareWith = (a: Cliente, b: Cliente) => a && b && a === b;
      });
  }


  protected filterBanks() {
    if (!this.empresasPadre) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.empresasPadre.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.empresasPadre.filter(bank => bank.razonSocial.toLowerCase().indexOf(search) > -1)
    );

  }


  onSelect(empresa: any): void {
    console.log('el codigo de la empresa front: ', empresa.idCliente);
    //enviar data al padre
    //console.log(" this.bankCtrl.value", this.bankCtrl.value);
    this.responseCombo.emit(empresa.idCliente);
  }

}
