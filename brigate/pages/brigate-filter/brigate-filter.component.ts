import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../../shared/services/from.service';
import { BrigateFilter } from '../../models/brigate-filter.interface';
import { ChangeItemDropdown, ConfigurationDropdownProp, DynamicDataToDialog, ItemDropdown } from '../../../../core/interfaces/ItemDropdown.models';

@Component({
  selector: 'app-brigate-filter',
  templateUrl: './brigate-filter.component.html',
  styleUrl: './brigate-filter.component.sass',
})
export class BrigateFilterComponent implements OnInit {
itemsPersona!: ItemDropdown[];
lsPersona!: DynamicDataToDialog;
personaConfig!: ConfigurationDropdownProp;
onItemChanged(eventData: ChangeItemDropdown) {
  if (eventData && eventData.conf.Id === 'idPersona') {

    this.formFilterConsult.get('personId')?.setValue(eventData.data.code);
  }

}
  @Output() queryEmitter = new EventEmitter<BrigateFilter>();
  @Input() openContentReceiver: boolean =false;

  IsOpen: boolean = false;
  formFilterConsult!: FormGroup;
  fomrBrigateFilter!: BrigateFilter;

  constructor(private formService: FormService) {

  }

  ngOnInit(): void {
    this.openContentReceiver=true
    this.clearFiltersEvent();
    this.buildForm();
    this.InitializerData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      if (propName === 'openContentReceiver') {
        this.IsOpen = !this.IsOpen;
      }
    }
  }

  Buscar() {
    this.queryEmitter.emit(this.formFilterConsult.value);
  }

  clearFiltersEvent() {
    if (this.formFilterConsult) {
        this.formFilterConsult.reset();
        this.queryEmitter.emit({
            ...this.formFilterConsult.value,
            offset: 0,
            take: 10,
        });
    }
    this.itemsPersona = [];
}


  closed() {
    // this.clearFiltersEvent();
    this.IsOpen = !this.IsOpen;
  }
  InitializerData() {
    this.lsPersona = { Params: [] };
    this.personaConfig = {
      Id: 'idPersona',
      Name: 'Persona',
      Tooltip: 'Search Persona',
      Dataset: 'Persona',
      NameComponent: 'PersonDialogComponet'
    };
    this.itemsPersona = [];

  }

  buildForm() {
    this.fomrBrigateFilter = {
      id: undefined,
      //companyId: undefined,
      //personId: undefined,
      name: undefined,
      //descripction: undefined,
      offset: 0,
      take: 10,
      sort: '',

    };
    this.formFilterConsult = this.formService.createFormGroup<BrigateFilter>(
      this.fomrBrigateFilter
    );
  }
}
