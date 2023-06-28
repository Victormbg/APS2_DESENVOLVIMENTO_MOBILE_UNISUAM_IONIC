import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { Storage } from '@ionic/storage-angular';
import { AutenticacaoService } from './usuario/autenticacao.service';

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

  constructor(private storage: Storage, private autenticacaoService: AutenticacaoService) { }

  async ngOnInit() {
    try {
      await this.storage.create();
      const count = await this.storage.get('entrarCount');
      const entrarCount = count ? count + 1 : 1;
      await this.storage.set('entrarCount', entrarCount);

      console.log('Número de vezes que o usuário entrou na aplicação:', entrarCount);
    } catch (error) {
      console.error('Erro ao acessar o armazenamento local:', error);
      // Trate o erro de acordo com a sua necessidade
    }
  }

  sair() {
    this.autenticacaoService.logout();
  }

}
