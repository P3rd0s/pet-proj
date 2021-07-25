import {Component, OnInit, OnDestroy} from '@angular/core';
import {About, Available, Device} from "../../interfaces/device";
import {DeviceService} from "../../services/device.service";
import {Subscription} from "rxjs";
import {take} from "rxjs/operators";



@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {


  devices: Device[] = [];
  about: About = {
    midPrice: 0,
    differentModels: 0,
    soldDevices: 0,
    availableDevices: 0,
    midRating: 0};

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getAbout();
  }


  getAbout(): void {
    this.deviceService.calcAbout()
      .pipe(take<About>(1))
      .subscribe(about => this.about = about);
  }

}
