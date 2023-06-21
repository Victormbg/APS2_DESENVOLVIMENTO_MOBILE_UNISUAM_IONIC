import { Component, OnInit } from '@angular/core';
import { ApiFutebolService } from '../api/api-futebol.service';
import { LoadingController } from '@ionic/angular';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-times',
  templateUrl: './times.page.html',
  styleUrls: ['./times.page.scss'],
  providers: [ApiFutebolService],
})
export class TimesPage implements OnInit {
  public times: any[] = [];
  public selectedTime: any;

  constructor(
    public apiFutebolService: ApiFutebolService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.carregaTimes();
  }

  changeCampeonato() {
    this.times = [];
    this.carregaTimes();
  }

  carregaTimes() {
    this.apiFutebolService.getTimes().subscribe(
      (timesData: Observable<any>[]) => {
        console.log(timesData);
        forkJoin(timesData).subscribe(
          (times: any[]) => {
            console.log(times);
            this.times = times;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
