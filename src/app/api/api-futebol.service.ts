import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFutebolService {

  private chave = 'Bearer live_256927bc877c14705acb266b9994cf';
  private caminhoPadrao = 'https://api.api-futebol.com.br/v1/campeonatos';

  constructor(public http: HttpClient) { }

  public getCampeonatos() {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return this.http.get(this.caminhoPadrao, { headers });
  }

  public getTabelas(id_campeonato = 10) {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = `${this.caminhoPadrao}/${id_campeonato}/tabela`;
    return this.http.get(url, { headers });
  }

}
