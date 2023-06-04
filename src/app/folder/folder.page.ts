import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { GeoapifyService } from '../api/geoapify.service';
import { IbgeService } from '../api/ibge.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  providers: [GeoapifyService, IbgeService],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  public latitude: number = 1;
  public longitude: number = 1;

  public endereco: string = "";
  public estado: string = "";
  public estadoId: number = 1;
  public sigla: string = "";

  public regiaoID: number = 1;
  public regiaoNome: string = "";
  public regiaoSigla: string = "";

  constructor(public GeoapifyService: GeoapifyService, public IbgeService: IbgeService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  PegarLocalizacao = async () => {
    console.log("Usando o Geolocation native do capacitor");
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    console.log('Latitude:', this.latitude, 'longitude', this.longitude);
    this.PegarEndereco();

  };

  PegarEndereco() {
    console.log("Usando a API Geoapify")
    this.GeoapifyService.getReverseGeocoding(this.latitude, this.longitude).subscribe(
      (data) => {
        const response = data as any;
        console.log(response)
        this.endereco = response.features[0].properties.formatted;
        console.log(this.endereco);
        // Pega o ID do Estado
        this.estado = response.features[0].properties.city;
        this.PegarEstadoIdPorNomeDoIBGE(this.estado);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  PegarEstadoIdPorNomeDoIBGE(estado: string) {
    console.log("Usando a API do IBGE para pegar o ID do Estado")
    this.IbgeService.getEstadoIdPorNome(estado)
      .then((data) => {
        const estadoId = data;
        if (estadoId) {
          console.log(`ID do estado "${estado}": ${estadoId}`);
          this.estadoId = estadoId;
          this.PegarDadosDoIBGE(estadoId)
        } else {
          console.log(`Estado "${estado}" não encontrado`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  PegarDadosDoIBGE(estadoId: number) {
    console.log("Usando a API do IBGE para pegar dados do Estado")
    this.IbgeService.getUFPorIdentificador(estadoId).subscribe(
      (data) => {
        const response = data as any;
        console.log(response)
        this.sigla = response.sigla;
        this.regiaoID = response.regiao.id
        this.regiaoNome = response.regiao.nome
        this.regiaoSigla = response.regiao.sigla
      },
      (error) => {
        console.log(error);
      }
    );

  }
}
