import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Device, Available} from "../interfaces/device";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb(){
    const devices = [
      {
        id: 11,
        deviceName: 'HP Pavilion',
        price: 1999,
        availability: Available.available,
        soldPieces: 12,
        rating: 4
      },
      {
        id: 12,
        deviceName: 'Acer Aspire',
        price: 999,
        availability: Available.expected,
        soldPieces: 102,
        rating: 4.5
      },
      {
        id: 13,
        deviceName: 'Acer Nitro Series',
        price: 1499,
        availability: Available.notAvailable,
        soldPieces: 212,
        rating: 3.8
      },
      {
        id: 14,
        deviceName: 'Macbook Air',
        price: 2999,
        availability: Available.available,
        soldPieces: 48,
        rating: 4.9
      },
      {
        id: 15,
        deviceName: 'Macbook Pro',
        price: 3599,
        availability: Available.expected,
        soldPieces: 14,
        rating: 4.8
      },
      {
        id: 16,
        deviceName: 'HP Omen',
        price: 1099,
        availability: Available.available,
        soldPieces: 292,
        rating: 4.2
      }
    ];

    return {devices}
  }


  genId(devices: Device[]): number{
    return devices.length > 0 ? Math.max(...devices.map(d => d.id)) + 1 : 11;
  }

  constructor() { }
}
