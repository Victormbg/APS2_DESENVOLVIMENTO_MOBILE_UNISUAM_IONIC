import { Component, OnInit } from '@angular/core';
import { ApiFutebolService } from '../api/api-futebol.service';
import { Observable, forkJoin } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-times',
  templateUrl: './times.page.html',
  styleUrls: ['./times.page.scss'],
  providers: [ApiFutebolService],
})
export class TimesPage implements OnInit {

  public times: any[] = [];
  public timeSelecionado: any;
  public indiceTimeSelecionado: number = -1;
  public mensagem: string = "";
  public id_campeonato: number = 10; // Valor padrão para o CAMPEONATO BRASILEIRO
  public selectedCampeonato: string = '10'; // Valor padrão selecionado no ion-select

  constructor(
    public apiFutebolService: ApiFutebolService,
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  changeCampeonato() {
    this.id_campeonato = Number(this.selectedCampeonato); // Atribui o valor selecionado a id_campeonato
    this.timeSelecionado = null; // Limpa o time selecionado
    this.indiceTimeSelecionado = -1; // Reinicia o índice do time selecionado
    this.carregaTimes();
  }

  changeTime() {
    console.log("indiceTimeSelecionado: ", this.indiceTimeSelecionado);
    const timeId = this.times[this.indiceTimeSelecionado].time_id;
    console.log(timeId)
    this.loadSelectedTimeDetails(timeId);
  }

  carregaTimes() {
    this.apiFutebolService.getTimes(this.id_campeonato).subscribe(
      (timesData: any[]) => {
        console.log("Response: ", timesData);
        this.times = timesData;
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


  loadSelectedTimeDetails(timeId: number) {
    this.apiFutebolService.getTimeDetalhes(timeId).subscribe(
      (detalhesTime: any) => {
        this.timeSelecionado = detalhesTime;
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


  async exibeMensagem() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: this.mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

}
