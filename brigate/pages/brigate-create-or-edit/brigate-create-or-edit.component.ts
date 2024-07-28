import {
  Component,
  AfterViewInit,
  OnInit,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ChangeItemDropdown,
  ConfigurationDropdownProp,
  DynamicDataToDialog,
  ItemDropdown,
} from '../../../../core/interfaces/ItemDropdown.models';
import { FormService } from '../../../../shared/services/from.service';
import { BrigateForm } from '../../interfaces/brigate-form';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrigateService } from '../../services/brigate.service';
import { ConfSystemServiceService } from '../../../../data/conf-system-service.service';

@Component({
  selector: 'app-brigate-create-or-edit',
  templateUrl: './brigate-create-or-edit.component.html',
  styleUrl: './brigate-create-or-edit.component.sass',
})
export class BrigateCreateOrEditComponent
  implements OnDestroy, OnInit, OnChanges
{
  personaConfig!: ConfigurationDropdownProp;
  lsPersona!: DynamicDataToDialog;

  itemsPersona: ItemDropdown[] = [];
  @Output() isUpdateListDetails = new EventEmitter<boolean>();

  brigateForm!: FormGroup;
  formData!: BrigateForm;
  update: boolean = false;
  label: any = 'Crear';

  loading: boolean = false;
  view: boolean = false;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formService: FormService,
    private brigateService: BrigateService,
    private configService: ConfSystemServiceService,

    private cdr: ChangeDetectorRef
  ) {
    this.InitializeData();
  }
  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {}

  onItemChanged(eventData: ChangeItemDropdown) {
    if (eventData && eventData.conf.Id === 'idPersona') {
      this.brigateForm.get('personId')?.setValue(eventData.data.code);
    }
  }
  private buildFormData() {
    this.formData = {
      ...this.config.data.brigate,
      start: new Date(this.config.data.brigate.start),
      end: new Date(this.config.data.brigate.end),
    };

    this.brigateForm = this.formService.createFormGroup<BrigateForm>(
      this.formData
    );
    this.validator();
  }
  InitializerData() {
    this.lsPersona = { Params: [] };
    this.personaConfig = {
      Id: 'idPersona',
      Name: 'Persona',
      Tooltip: 'Search Persona',
      Dataset: 'Persona',
      NameComponent: 'PersonDialogComponet',
    };
    this.itemsPersona = [];
    if (this.update || this.view) {
      this.itemsPersona.push({
        code: this.brigateForm.get('personId')?.value,
        description:
          String(this.brigateForm.get('identificationPerson')?.value) +
          '-' +
          String(this.brigateForm.get('nameCompletedPerson')?.value),
      });
    }
  }

  ngOnInit(): void {
    this.InitializeData();
  }
  InitializeData() {
    this.update = this.config.data.update;
    this.view = this.config.data.view;

    if (this.update) {
      this.label = 'Actualizar';
      this.buildFormData();
    } else {
      this.label = 'Crear';
      this.buildForm();
    }
    this.InitializerData();
    this.validator();
  }

  InputData() {
    if (this.update) {
      this.Updatebrigate();
      setTimeout(() => {
        this.isUpdateListDetails.emit(true);
        this.ref.close(this.brigateForm.value);
      }, 1000);
    } else {
      this.Createbrigate();
      setTimeout(() => {
        this.isUpdateListDetails.emit(true);
        this.ref.close(this.brigateForm.value);
      }, 1000);
    }
  }

  async Createbrigate() {
    try {
      await this.brigateService
        .createBrigate(this.brigateForm.value)
        .toPromise();
    } catch (error) {
      // Handle the error
    }
  }

  async Updatebrigate() {
    try {
      await this.brigateService
        .updateBrigate(this.brigateForm.value)
        .toPromise();
      // The HTTP request has completed
    } catch (error) {
      // Handle the error
    }
  }
  closeDialog() {
    this.ref.close();
  }

  onIdentificationTypeChange(value: any) {
    this.brigateForm.patchValue({
      identificationTypeId: value, // Actualiza el valor de identificationTypeId en el formulario
    });
  }

  buildForm() {
    this.formData = {
      //description: '',
      //end: new Date(),
      name: '',
      //start: new Date(),
      //companyId: 0,
      //personId: 0,
    };
    this.brigateForm = this.formService.createFormGroup<BrigateForm>(
      this.formData
    );
  }

  private validator() {
    this.brigateForm.get('name')?.setValidators([Validators.required]);
    this.brigateForm.get('description')?.setValidators([Validators.required]);
    this.brigateForm.get('end')?.setValidators([Validators.required]);
    this.brigateForm.get('start')?.setValidators([Validators.required]);

    this.brigateForm
      .get('personId')
      ?.setValidators([Validators.required, Validators.min(0)]);
  }

  valorDate(field: string) {
    const fieldValue = this.brigateForm.get(field)?.value;
    if (fieldValue instanceof Date) {
      // Formatear la fecha utilizando toLocaleDateString
      return fieldValue.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
    }

    // Si no es una fecha, devolver el valor sin formatear
    return fieldValue || '';
  }
}
