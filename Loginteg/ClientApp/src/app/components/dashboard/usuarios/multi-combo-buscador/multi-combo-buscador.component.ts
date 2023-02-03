import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Cliente } from '../../../../interfaces/cliente';

export interface Empresa {
  id: string;
  name: string;
}

@Component({
  selector: 'app-multi-combo-buscador',
  templateUrl: './multi-combo-buscador.component.html',
  styleUrls: ['./multi-combo-buscador.component.css']
})
export class MultiComboBuscadorComponent implements OnInit, AfterViewInit, OnDestroy {

  
  /** list of empresas hijas */
  @Input() empresasHijas!: Cliente[];

  //send data to father component
  @Output() responseComboMulti: EventEmitter<any> = new EventEmitter();


  /** control for the selected bank for multi-selection */
  public bankMultiCtrl = new FormControl('');

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl = new FormControl('');

  /** list of banks filtered by search keyword */
  public filteredBanksMulti: ReplaySubject<Cliente[]> = new ReplaySubject<Cliente[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect!: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(private _formBuilder: FormBuilder) { }


  ngOnInit() {
    // set initial selection, considering number of item in array 
    this.bankMultiCtrl.setValue([this.empresasHijas[1], this.empresasHijas[2], this.empresasHijas[3]]);

    // load the initial bank list
    this.filteredBanksMulti.next(this.empresasHijas.slice());

    // listen for search field value changes
    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
 * Sets the initial value after the filteredBanks are loaded initially
 */
  protected setInitialValue() {
    this.filteredBanksMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Cliente, b: Cliente) => a && b && a.idCliente === b.idCliente;
      });
  }

  protected filterBanksMulti() {
    if (!this.empresasHijas) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.empresasHijas.slice());
      return;

    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.empresasHijas.filter(bank => bank.razonSocial.toLowerCase().indexOf(search) > -1)
    );
  }


  onSelect(empresa: any): void {
    console.log('el codigo de la empresa front: ', empresa.value);
    this.responseComboMulti.emit(empresa.value);

  }





}
