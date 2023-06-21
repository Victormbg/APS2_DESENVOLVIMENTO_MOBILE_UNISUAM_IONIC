import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabelasPageRoutingModule } from './tabelas-routing.module';

import { TabelasPage } from './tabelas.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TabelasPageRoutingModule
  ],
  declarations: [TabelasPage]
})
export class TabelasPageModule {}
