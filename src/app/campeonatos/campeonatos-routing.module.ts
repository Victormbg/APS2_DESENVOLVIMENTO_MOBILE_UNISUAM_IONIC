import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampeonatosPage } from './campeonatos.page';

const routes: Routes = [
  {
    path: '',
    component: CampeonatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampeonatosPageRoutingModule {}
