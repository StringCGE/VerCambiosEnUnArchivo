import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrigateRoutingModule } from './brigate-routing.module';

import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { BrigateIndexComponent } from './pages/brigate-index/brigate-index.component';
import { BrigateDetailComponent } from './pages/brigate-detail/brigate-detail.component';
import { BrigateCreateOrEditComponent } from './pages/brigate-create-or-edit/brigate-create-or-edit.component';
import { BrigateFilterComponent } from './pages/brigate-filter/brigate-filter.component';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    BrigateIndexComponent,
    BrigateDetailComponent,
    BrigateCreateOrEditComponent,
    BrigateFilterComponent,
  ],
  imports: [
    CommonModule,
    RippleModule,
    TagModule,
    CommonModule,
    SharedModule,
    RippleModule,
    TagModule,
    BrigateRoutingModule
  ],
  exports: [
    BrigateRoutingModule
  ]

})
export class BrigateModule { }
