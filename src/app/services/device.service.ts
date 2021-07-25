import {Injectable} from '@angular/core';
import {HistoryService} from "./history.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Available, compare, Device, FilterOptions} from "../interfaces/device";
import {catchError, tap, map, take} from "rxjs/operators";
import {Sort} from "@angular/material/sort";


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devicesURL = 'api/devices'

  private log(message: string): void {
    this.historyService.add(`DeviceService: ${message}`);
  }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  public getParametrizedTable(sort?: Sort, filter?: FilterOptions, search?: string): Observable<Device[]> {

    return this.http.get<Device[]>(this.devicesURL).pipe(
      tap(() => this.log('get devices table with filters/sort/search')),
      catchError(this.handleError<Device[]>('get devices table with filters/sort/search', [])),

      map(devices => {
        if (search)
          return devices.filter((d: Device) => (d.deviceName.toLowerCase().indexOf(search) !== -1
            || d.rating.toString().toLowerCase().indexOf(search) !== -1
            || d.price.toString().toLowerCase().indexOf(search) !== -1))

        else if (filter) {
          //Hardcode instead backend
          return devices.filter((d: Device) => {

            if (        //st line - check filter exist, nd line - filtering
              //By name
              (filter.name !== ''
                && (d.deviceName.toLowerCase().indexOf(filter.name.toLowerCase()) === -1))

              //By price
              || ((filter.price.from != 0 || filter.price.to != 9999)
              && (d.price < filter.price.from || d.price > filter.price.to))

              //By sold pieces
              || ((filter.soldPieces.from !== 0 || filter.soldPieces.to !== 9999)
              && (d.soldPieces < filter.soldPieces.from || d.soldPieces > filter.soldPieces.to))

              //By rating
              || ((filter.rating.from != 0 || filter.rating.to != 5)
              && (d.rating < filter.rating.from || d.rating > filter.rating.to))

              || ((filter.availability.length !== 0)
              && (() => {
                let isOk = false;
                for (let i of filter.availability) {
                  if (d.availability === i) {
                    isOk = true;
                    break;
                  }
                }
                return !isOk;
              })())
            ) return false;
            return true;
          });
        } else return devices;
      }),


      map(devices => sort
        ? devices.sort((d1: any, d2: any) => compare(d1[sort.active], d2[sort.active], sort.direction === 'asc'))
        : devices)
    );
  }


  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesURL).pipe(
      tap(() => this.log('get devices')),
      catchError(this.handleError<Device[]>('get devices', []))
    );
  }


  public getDevice(id: number): Observable<Device> {
    const deviceURL = `${this.devicesURL}/${id}`;
    return this.http.get<Device>(deviceURL).pipe(
      tap(() => this.log(`get device id=${id}`)),
      catchError(this.handleError<Device>(`get device id=${id}`))
    )
  }


  public updateDevice(device: Device): Observable<Device> {
    return this.http.put<Device>(this.devicesURL, device, this.httpOptions).pipe(
      tap(() => this.log(`updated device id=${device.id}`)),
      catchError(this.handleError<any>(`update device id=${device.id}`))
    );
  }


  public addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.devicesURL, device, this.httpOptions).pipe(
      tap((newDevice: Device) => this.log(`added device id=${newDevice.id}`)),
      catchError(this.handleError<any>(`added device id=${device.id}`))
    );
  }


  public deleteDevice(id: number): void {
    const deviceURL = `${this.devicesURL}/${id}`;
    this.http.delete<Device>(deviceURL, this.httpOptions).pipe(
      tap(() => this.log(`deleted device id=${id}`)),
      catchError(this.handleError<Device>(`deleted device`))
    );
  }

  public constructor(private http: HttpClient,
              private historyService: HistoryService) {
  }
}
