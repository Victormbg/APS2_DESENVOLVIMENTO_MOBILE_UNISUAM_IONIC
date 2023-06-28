import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  public mensagem: string = "";

  constructor(public ngFireAuth: AngularFireAuth, private router: Router, public alertController: AlertController) { }

  loginNoFirebase(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  insereNoFirebase(email: string, password: string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.ngFireAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
      console.log('Logout realizado com sucesso');
    }).catch((error) => {
      this.mensagem = 'Erro ao fazer logout: ' + error.message;
      this.exibeMensagem();
      console.error('Erro ao fazer logout:', error);
      // Trate o erro de acordo com a sua necessidade
    });
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
