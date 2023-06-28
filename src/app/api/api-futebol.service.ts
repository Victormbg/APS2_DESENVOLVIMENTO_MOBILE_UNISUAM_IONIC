import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiFutebolService {
  
  // Chave de TST
  //private chave = 'Bearer test_4358d77d21b49ade92f4b9dc717d62';
  // Chave de PRD
  private chave = 'Bearer live_256927bc877c14705acb266b9994cf';
  
  private caminhoPadrao = 'https://api.api-futebol.com.br/v1/campeonatos';

  constructor(public http: HttpClient) { }

  public getCampeonatos(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return this.http.get(this.caminhoPadrao, { headers });
  }

  public getTabelas(id_campeonato: number = 10): Observable<any> {
    console.log(id_campeonato)
    const headers = new HttpHeaders().set('Authorization', this.chave);
    const url = `${this.caminhoPadrao}/${id_campeonato}/tabela`;
    return this.http.get(url, { headers });
  }

  public getTimes(id_campeonato: number = 10): Observable<any[]> {
    const tabelaUrl = `https://api.api-futebol.com.br/v1/campeonatos/${id_campeonato}/tabela`;
    const headers = new HttpHeaders().set('Authorization', this.chave);
  
    return this.http.get(tabelaUrl, { headers }).pipe(
      switchMap((response: any) => {
        const tabelas: any[] = response;
        const times: Observable<any>[] = [];
  
        for (const tabela of tabelas) {
          const timeId = tabela.time.time_id;
          const timeUrl = `https://api.api-futebol.com.br/v1/times/${timeId}`;
          const time$ = this.http.get(timeUrl, { headers });
          times.push(time$);
        }
  
        return forkJoin(times);
      })
    );
  }
  

  public getTimeDetalhes(timeId: number): Observable<any> {
    const timeUrl = `https://api.api-futebol.com.br/v1/times/${timeId}`;
    const headers = new HttpHeaders().set('Authorization', this.chave);
    return this.http.get(timeUrl, { headers });
  }
 

}
