import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiFutebolService {

  private chave = 'Bearer live_256927bc877c14705acb266b9994cf';
  private caminhoPadrao = 'https://api.api-futebol.com.br/v1/campeonatos';

  constructor(public http: HttpClient) { }

  public getCampeonatos(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return this.http.get(this.caminhoPadrao, { headers });
  }

  public getTabelas(id_campeonato: number = 10): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = `${this.caminhoPadrao}/${id_campeonato}/tabela`;
    return this.http.get(url, { headers });
  }

  public getTimes(id_campeonato: number = 10): Observable<any> {
    return this.getTabelas(id_campeonato).pipe(
      map((response: any) => {
        const tabelas: any[] = response;
        const times: Observable<any>[] = [];

        for (const tabela of tabelas) {
          const timeId = tabela.time.time_id;
          const timeUrl = `https://api.api-futebol.com.br/v1/times/${timeId}`;
          const headers = new HttpHeaders().set('Authorization', this.chave);
          const time$ = this.http.get(timeUrl, { headers });
          times.push(time$);
        }

        console.log(times)

        return forkJoin(times);
      })
    );
  }

}
