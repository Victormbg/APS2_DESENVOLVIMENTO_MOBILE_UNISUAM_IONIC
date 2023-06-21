import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeoapifyService {

  private chave = 'c19ee0a6bd184b13b2cd852fbe6f1ccc';
  private caminhoPadrao = 'https://api.geoapify.com/v1/geocode/reverse';

  constructor(public http: HttpClient) { }

  public getReverseGeocoding(latitude = 51.21709661403662, longitude = 6.7782883744862374) {
    let features = `${this.caminhoPadrao}?lat=${latitude}&lon=${longitude}&apiKey=${this.chave}`;
    return this.http.get(features);
  }
}
