import { Component, OnInit } from '@angular/core';
import { ApiFutebolService } from '../api/api-futebol.service';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.page.html',
  styleUrls: ['./campeonatos.page.scss'],
  providers: [ApiFutebolService],
})
export class CampeonatosPage implements OnInit {

  public campeonatos = new Array<any>();
  public page: number = 1;
  public totalResults: number = 0;
  public scrollDisabled: boolean = false;
  public mensagem: string = "";

  constructor(public apiFutebolService: ApiFutebolService, private loadingController: LoadingController, public alertController: AlertController) { }

  ngOnInit() {
    this.efeitoLoading();
    this.carregaPagina();
  }

  carregaPagina() {
    this.apiFutebolService.getCampeonatos().subscribe(
      (data) => {
        const response = data as any;
        this.totalResults = response.length;

        if (this.page == 1) {
          this.campeonatos = response.slice(0, 10); // Exibe os primeiros 10 resultados
        } else {
          const startIndex = (this.page - 1) * 10;
          const endIndex = this.page * 10;
          this.campeonatos = this.campeonatos.concat(response.slice(startIndex, endIndex));
        }

        console.log(this.campeonatos);

        if (this.page * 10 >= this.totalResults) {
          this.scrollDisabled = true; // Desativa o scroll infinito quando todos os resultados são carregados
        } else {
          this.scrollDisabled = false; // Ativa o scroll infinito
        }
      },
      (error) => {
        let mensagemErro = '';

        switch (error.status) {
          case 400:
            mensagemErro = 'Erro de solicitação inválida.';
            break;
          case 401:
            mensagemErro = 'Erro de autenticação. Verifique suas credenciais.';
            break;
          case 403:
            mensagemErro = 'Acesso proibido. Você não tem permissão para acessar este recurso.';
            break;
          case 404:
            mensagemErro = 'Recurso não encontrado.';
            break;
          case 429:
            mensagemErro = 'Muitas solicitações. Por favor, aguarde um pouco antes de tentar novamente.';
            break;
          case 500:
            mensagemErro = 'Erro interno do servidor. Tente novamente mais tarde.';
            break;
          default:
            mensagemErro = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
            break;
        }
        console.log(`Erro ${error.status}: ${error.message}`);
        this.mensagem = `Erro ${error.status}: ${mensagemErro}`;
        this.exibeMensagem();
      }
    );
  }

  async efeitoLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando Campeonatos',
      duration: 1000,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  efeitoRefresh(event: any) {
    this.page = 1;
    this.scrollDisabled = false; // Ativa o scroll infinito após o refresh
    this.carregaPagina();
    console.log('Iniciando operação assíncrona');

    setTimeout(() => {
      event.target.complete();
      console.log('Finalizando refresh');
    }, 500);
  }

  efeitoScrollInfinito(ev: any) {
    this.page++;

    if (this.page * 10 >= this.totalResults) {
      (ev as InfiniteScrollCustomEvent).target.disabled = true; // Desativa o scroll infinito
    }

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
      this.carregaPagina();
    }, 1000);
  }

  async exibeMensagem() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: this.mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

}
