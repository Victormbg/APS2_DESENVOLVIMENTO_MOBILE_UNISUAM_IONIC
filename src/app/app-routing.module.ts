import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'campeonatos',
    pathMatch: 'full'
  },
  {
    path: 'tabelas',
    loadChildren: () => import('./tabelas/tabelas.module').then( m => m.TabelasPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'campeonatos',
    loadChildren: () => import('./campeonatos/campeonatos.module').then( m => m.CampeonatosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
