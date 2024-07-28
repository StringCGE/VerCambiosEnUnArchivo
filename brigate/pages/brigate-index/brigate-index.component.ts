import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BrigateCreateOrEditComponent } from '../brigate-create-or-edit/brigate-create-or-edit.component';
import { BrigateFilter } from '../../models/brigate-filter.interface';
import { BrigateService } from '../../services/brigate.service';
import { FORMERR } from 'dns';

@Component({
  selector: 'app-brigate-index',
  templateUrl: './brigate-index.component.html',
  styleUrls: ['./brigate-index.component.sass'],
})
export class BrigateIndexComponent implements OnInit {
  entityFilterRequest: BrigateFilter | undefined;
  isUpdateListDetails: boolean = false;
  openFilterPanel = true;
  loading: boolean = false;
  cambios: any;

  constructor(
    private dialogService: DialogService,
    private brigateService: BrigateService
  ) {}

  ngOnInit(): void { }

  NavigateToCreate() {
    const refdialog = this.dialogService
      .open(BrigateCreateOrEditComponent, {
        header: 'Crear Brigada',
        width: 'auto',
        height: 'auto',
        data: {},
        contentStyle: { 'min-height': '500px', 'min-width': '500px' },
        baseZIndex: 10000,
      })
      .onClose.subscribe((result) => {
        if (result) {
          this.isUpdateListDetails = true;
        }
      });
  }

  openCloseFilter() {
    this.openFilterPanel = !this.openFilterPanel;
  }

  getBrigadaRequestFilter(event: BrigateFilter) {
    this.entityFilterRequest = event;

    let beneficiarioFilter = Object.fromEntries(
      Object.entries(event).filter(
        ([key, value]) => value !== '' && value !== null
      )
    );

    if (Object.keys(beneficiarioFilter).length !== 0) {
        let beneficiarioFilter: BrigateFilter = {
          id: event.id || 0,
          name: event.name || '',
          sort: event.sort || '',
          offset: event.offset || 0,
          take: event.take || 10,
        };

      beneficiarioFilter = { ...beneficiarioFilter, offset: 0, take: 10 };

      this.brigateService
        .getAllBrigate(beneficiarioFilter)
        .subscribe(
          (result: { result: any[], length: number }) => { // Ajusta el tipo según lo que devuelva tu servicio
            this.cambios = {
              listabeneficiarios: result.result,
              totalRows: result.length,
              loading: false,
            };
          },
          (error: any) => { // Ajusta el tipo según lo que devuelva el error
            console.error('Error:', error);
          }
        );
    }
  }
}
