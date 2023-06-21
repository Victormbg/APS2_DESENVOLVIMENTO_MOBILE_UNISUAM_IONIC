import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GeoapifyService } from '../api/geoapify.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.page.html',
  styleUrls: ['./sobre.page.scss'],
  providers: [GeoapifyService],
})
export class SobrePage implements OnInit {

  public latitude: number = 1;
  public longitude: number = 1;
  public endereco: string = "";
  public estado: string = "";
  public bairro: string = "";

  constructor(public geoapifyService: GeoapifyService) { }

  ngOnInit() {
    this.pegarLocalizacao();
  }

  async pegarLocalizacao() {
    try {
      console.log("Usando o Geolocation native do capacitor");
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log('Latitude:', this.latitude, 'longitude', this.longitude);
      this.pegarEndereco();
    } catch (error) {
      console.log("Erro ao obter localização:", error);
    }
  }

  pegarEndereco() {
    console.log("Usando a API Geoapify");
    this.geoapifyService.getReverseGeocoding(this.latitude, this.longitude).subscribe(
      (data: any) => {
        console.log(data);
        this.endereco = data.features[0].properties.formatted;
        this.estado = data.features[0].properties.city;
        this.bairro = data.features[0].properties.suburb;
      },
      (error) => {
        console.log("Erro ao obter o endereço:", error);
      }
    );
  }
}
