import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  constructor(public http: HttpClient) { }

  private caminhoPadrao = "https://servicodados.ibge.gov.br/api/v1"

  public getEstadoIdPorNome(nomeEstado: string): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.caminhoPadrao}/localidades/estados`)
        .subscribe((response: any) => {
          const estados = response;

          // Percorre a lista de estados e encontra o estado com o nome desejado
          const estadoEncontrado = estados.find((estado: any) => estado.nome === nomeEstado);

          if (estadoEncontrado) {
            const estadoId = estadoEncontrado.id;
            resolve(estadoId);
          } else {
            resolve(null); // Retorna null se o estado não for encontrado
          }
        }, (error: any) => {
          console.error('Erro ao obter o ID do estado:', error);
          reject(error);
        });
    });
  }

  public getUFPorIdentificador(estadoId: number) {
    let response = `${this.caminhoPadrao}/localidades/estados/${estadoId}`;
    return this.http.get(response);
  }
}
