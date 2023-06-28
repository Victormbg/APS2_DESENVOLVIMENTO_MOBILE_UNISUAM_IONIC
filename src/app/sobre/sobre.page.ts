import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GeoapifyService } from '../api/geoapify.service';
import { AlertController, MenuController } from '@ionic/angular';
import Swiper from 'swiper';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
  providers: [GeoapifyService],
})
export class SobrePage implements OnInit, AfterViewInit {

  public latitude: number = 1;
  public longitude: number = 1;
  public endereco: string = '';
  public estado: string = '';
  public bairro: string = '';
  public mensagem: string = '';

  constructor(
    public geoapifyService: GeoapifyService,
    public alertController: AlertController,
    private menuController: MenuController,
    private router: Router,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.pegarLocalizacao();
    try {
      await this.storage.create();
      const exibirSobre = await this.storage.get('exibirSobre');
      const entrarCount = await this.storage.get('entrarCount');
      if (exibirSobre === false || entrarCount > 10) {
        this.router.navigateByUrl('/login');
      } else {
        // O valor armazenado indica que a tela de sobre deve ser exibida
        // Realize qualquer ação necessária
      }
      console.log('Valor lido do armazenamento local (exibirSobre):', exibirSobre);
      console.log('Valor lido do armazenamento local (entrarCount):', entrarCount);
    } catch (error) {
      console.error('Erro ao acessar o armazenamento local:', error);
      // Trate o erro de acordo com a sua necessidade
    }
  }

  ionViewDidEnter() {
    this.menuController.swipeGesture(false, 'start');
  }

  ionViewDidLeave() {
    this.menuController.swipeGesture(true, 'start');
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      allowSlideNext: true,
      allowSlidePrev: true,
    });
  }

  async pegarLocalizacao() {
    try {
      console.log('Usando o Geolocation native do capacitor');
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log('Latitude:', this.latitude, 'longitude', this.longitude);
      this.pegarEndereco();
    } catch (error) {
      console.log('Erro ao obter localização:', error);
    }
  }

  pegarEndereco() {
    console.log('Usando a API Geoapify');
    this.geoapifyService.getReverseGeocoding(this.latitude, this.longitude).subscribe(
      (data: any) => {
        console.log(data);
        this.endereco = data.features[0].properties.formatted;
        this.estado = data.features[0].properties.city;
        this.bairro = data.features[0].properties.suburb;
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
      buttons: ['OK'],
    });
    await alert.present();
  }

  doNotShowAgain() {
    // Salva a informação no armazenamento local
    this.storage.set('exibirSobre', false)
      .then(() => {
        console.log('Informação gravada no armazenamento local com sucesso.');
        // Redireciona para a página de login
        this.router.navigateByUrl('/login');
      })
      .catch((error) => {
        console.error('Erro ao gravar informação no armazenamento local:', error);
        // Trate o erro de acordo com a sua necessidade
      });
  }

}
