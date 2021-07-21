import {Component, OnInit, OnDestroy} from '@angular/core';
import {Available, Device} from "../../interfaces/device";
import {DeviceService} from "../../services/device.service";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit, OnDestroy {


  devices: Device[] = [];
  subscriptions: Subscription[] =[];

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
    this.getDevices();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  getDevices(): void {
    this.subscriptions.push(this.deviceService.getDevices()
      .subscribe(devices => this.devices = devices));
  }

  calcMidPrice(): number {
    return Math.floor(this.devices
      .reduce((sum, device) => sum+device.price, 0)
      /this.devices.length);
  }
  calcDevicesSold(): number {
    return this.devices.reduce((sum, device) => sum + device.soldPieces, 0);
  }

  calcDevicesAvailable(): number {
    return this.devices.filter(dev => dev.availability === Available.available).length;
  }

  calcMidRating(): number {
    return Math.floor(this.devices.reduce((rate, device) => rate + device.rating, 0)
      /this.devices.length);
  }




}
