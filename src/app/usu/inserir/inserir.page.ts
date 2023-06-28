import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/usuario/autenticacao.service';

@Component({
  selector: 'app-inserir',
  templateUrl: './inserir.page.html',
  styleUrls: ['./inserir.page.scss'],
})
export class InserirPage implements OnInit {

  public email: string = "";
  public senha: string = "";
  public mensagem: string = "";

  constructor(
    public autenticacaoService: AutenticacaoService,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  insereUsuario() {
    this.autenticacaoService.insereNoFirebase(this.email, this.senha)
      .then((res) => {
        console.log(res)
        this.router.navigate(['campeonatos']);
      }).catch((error) => {
        console.log(error)
        switch (error.code) {
          case 'auth/invalid-email':
            this.mensagem = 'O endereço de e-mail fornecido é inválido.';
            break;
          case 'auth/user-disabled':
            this.mensagem = 'A conta de usuário foi desabilitada.';
            break;
          case 'auth/user-not-found':
            this.mensagem = 'Não foi encontrada nenhuma conta de usuário correspondente ao endereço de e-mail fornecido.';
            break;
          case 'auth/wrong-password':
            this.mensagem = 'A senha fornecida está incorreta.';
            break;
          case 'auth/email-already-in-use':
            this.mensagem = 'O endereço de e-mail fornecido já está em uso por outra conta.';
            break;
          case 'auth/operation-not-allowed':
            this.mensagem = 'A operação de autenticação correspondente não está permitida.';
            break;
          case 'auth/weak-password':
            this.mensagem = 'Senha fraca. A senha deve ter pelo menos 6 caracteres.';
            break;
          case 'auth/missing-password':
            this.mensagem = 'É necessário fornecer uma senha.';
            break;
          default:
            this.mensagem = 'Erro ao tentar criar o usuário!';
            break;
        }
        this.exibeMensagem();
      })
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