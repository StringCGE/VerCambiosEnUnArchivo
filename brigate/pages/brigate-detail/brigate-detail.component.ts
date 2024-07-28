import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BrigateCreateOrEditComponent } from '../brigate-create-or-edit/brigate-create-or-edit.component';
import { DialogService } from 'primeng/dynamicdialog';
import { BrigateFilter } from '../../models/brigate-filter.interface';
import { BrigateDto } from '../../interfaces/brigate-dto';
import { BrigateService } from '../../services/brigate.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Sort } from '../../../../core/interfaces/sort';

@Component({
  selector: 'app-brigate-detail',
  templateUrl: './brigate-detail.component.html',
  styleUrl: './brigate-detail.component.sass',
})
export class BrigateDetailComponent implements OnInit, OnChanges {
  @Input() queryRequest: BrigateFilter | undefined;
  @Input() isUpdateListDetails: boolean = false;
  @Input() searchFilter: any = {};

  DeleteData(brigate: BrigateDto, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de realizar este proceso?',
      header: 'Confirmación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        brigate.status = 'E'
        this.totalRows -= 1;
        this.deleteBrigate(brigate.id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: '',
          detail: 'Registro no eliminado',
          life: 3000,
        });
      },
    });
  }

  EditData(brigate: BrigateDto) {
    this.NavigateUpdate(brigate);
  }
  ViewData(brigate: BrigateDto) {
    this.NavigateView(brigate);
  }
  NavigateView(brigate: any) {
    this.dialogService.open(BrigateCreateOrEditComponent, {
      header: 'Ver Brigada',
      width: 'auto',
      height: 'auto',
      data: { update: true, brigate: brigate, view: true },
      contentStyle: { 'min-height': '500px', 'min-width': '500px' },
      baseZIndex: 10000,
    });
  }
  loading: boolean = false;
  listaBrigate: BrigateDto[] = [];
  totalRows: number = 0;
  brigateFiler!: BrigateFilter;
  constructor(
    private dialogService: DialogService,
    private brigateService: BrigateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.getBrigate();
  }

  private handleUpdateListDetails() {
    this.getBrigate(); // Llamada a la función que obtiene las brigadas
  }
  ngOnChanges(changes: SimpleChanges): void {
    for (let change in changes) {
      if (change === 'isUpdateListDetails') {
        if (this.isUpdateListDetails) {
          this.handleUpdateListDetails();
        }
      }
      if (change === 'searchFilter') {
        if (changes[change].currentValue) {
          // console.log(changes[change].currentValue)
          this.listaBrigate = changes[change].currentValue.listabeneficiarios;
          this.totalRows = changes[change].currentValue.totalRows;
          this.loading = changes[change].currentValue.loading;
        }
      }
    }
  }
  private getBrigate() {
    this.brigateFiler = {
      offset: 0,
      take: 10,
      sort: '',
    };

    this.brigateService.getAllBrigate(this.brigateFiler).subscribe(
      (result) => {
        this.listaBrigate = result.result;
        this.totalRows = result.length;
        this.loading = false;
      },
      (error) => {}
    );
  }
  NavigateUpdate(brigate: BrigateDto) {
    this.dialogService
      .open(BrigateCreateOrEditComponent, {
        header: 'Actualizar Brigada',
        width: 'auto',
        height: 'auto',
        data: { update: true, brigate: brigate },
        contentStyle: { 'min-height': '500px', 'min-width': '500px' },
        baseZIndex: 10000,
      })

      .onClose.subscribe((result) => {
        if (result) {
          this.getBrigate();
        }
      });
  }
  loadDetailsLazy(event: any) {
    let sortCol = event.sortField;
    let sortColOrder = event.sortOrder;
    let offset = event.first;
    let take = event.rows;
    let sortStr = '';
    if (!(sortCol === undefined || sortCol === null)) {
      let sortArray: Sort[] = [];
      let sortObj: Sort = {
        selector: sortCol,
        desc: sortColOrder !== 1,
      };
      sortArray.push(sortObj);
      sortStr = JSON.stringify(sortArray);
    }

    this.brigateFiler.sort = sortStr;
    this.brigateFiler.take = take;
    this.brigateFiler.offset = offset;
    this.brigateService.getAllBrigate(this.brigateFiler).subscribe(
      (result) => {
        this.listaBrigate = result.result;
        this.totalRows = result.length;
        this.loading = false;
      },
      (error) => {}
    );
  }

  private deleteBrigate(id: number) {
    this.brigateService.deleteBrigate(id).subscribe({
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: '',
          detail: 'Registro eliminado',
          life: 3000,
        });
      },
      error: () => {},
    });
  }
}
