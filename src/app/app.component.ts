import { Component } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Campeonatos', url: 'campeonatos', icon: 'trophy' },
    { title: 'Tabelas', url: 'tabelas', icon: 'grid' },
    { title: 'Sobre', url: 'sobre', icon: 'information-circle' }
  ];
  constructor() { }

  sair() {
    App.exitApp();
  }

}
