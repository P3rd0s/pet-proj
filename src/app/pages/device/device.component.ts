import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {DeviceService} from "../../services/device.service";
import {Device} from "../../interfaces/device";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {


  device?: Device;

  constructor(private route: ActivatedRoute,
              private deviceService: DeviceService,
              private location: Location) { }

  ngOnInit(): void {
    this.getDevice();
  }


  private getDevice(): void {
    const id =Number(this.route.snapshot.paramMap.get('id'));
    this.deviceService.getDevice(id)
      .pipe(take<Device>(1))
      .subscribe(device => this.device = device);
  }

}
