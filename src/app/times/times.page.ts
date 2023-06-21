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
  public selectedTime: any;
  public mensagem: string = "";

  constructor(
    public apiFutebolService: ApiFutebolService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.carregaTimes();
  }

  changeCampeonato() {
    this.times = [];
    this.carregaTimes();
  }

  carregaTimes() {
    this.apiFutebolService.getTimes().subscribe(
      (timesData: Observable<any>[]) => {
        console.log(timesData);
        forkJoin(timesData).subscribe(
          (times: any[]) => {
            console.log(times);
            this.times = times;
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
