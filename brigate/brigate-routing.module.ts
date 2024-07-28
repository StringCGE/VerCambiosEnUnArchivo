import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrigateIndexComponent } from './pages/brigate-index/brigate-index.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'index', component: BrigateIndexComponent
  }
  /*{
    path: '', component: BrigateIndexComponent
  },
  {
    path: 'create', component: BrigateIndexComponent
  },
  {
    path: 'edit/:id', component: BrigateIndexComponent
  },
  {
    path: 'donacion',
    loadChildren: () => import('./../brigate/brigate.module').then((m) => m.DonationModule),
  },
  {
    path: 'crud-donante',
    loadChildren: () => import('./donor/donor.module').then((m) => m.DonorModule),
  },
  {
    path: 'crud-voluntario',
    loadChildren: () => import('./../voluntario/voluntario.module').then((m) => m.VoluntarioModule),
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrigateRoutingModule { }
