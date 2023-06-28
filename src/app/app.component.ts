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
    { title: 'Times', url: 'times', icon: 'people' }
  ];
  
  constructor() { }

  sair() {
    App.exitApp();
  }

}
