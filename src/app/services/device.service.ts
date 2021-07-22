import { Injectable } from '@angular/core';
import {HistoryService} from "./history.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {compare, Device} from "../interfaces/device";
import {catchError, tap, map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devicesURL = 'api/devices'

  private log(message: string): void {
    this.historyService.add(`DeviceService: ${message}`);
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }



  getDevicesBy(sortedBy: string, isAbs: boolean, search: string): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesURL).pipe(
      tap(() => this.log(`get devices sorted by ${sortedBy}`)),
      catchError(this.handleError<Device[]>('get sorted devices',[])),
      map(devices => devices.filter((d:Device) => {

        return search
        ? (d.deviceName.toLowerCase().indexOf(search) !== -1
          || d.rating.toString().toLowerCase().indexOf(search) !== -1
          || d.price.toString().toLowerCase().indexOf(search) !== -1)
        : true;
      })
        //Sorting every time, if we not need this?
        .sort((d1:any, d2:any) => compare(d1[sortedBy], d2[sortedBy], isAbs)))
    );
  }



  getDevices(): Observable<Device[]>{
    return this.http.get<Device[]>(this.devicesURL).pipe(
      tap(() => this.log('get devices')),
      catchError(this.handleError<Device[]>('get devices',[]))
    );
  }



  getDevice(id: number): Observable<Device>{
    const deviceURL = `${this.devicesURL}/${id}`;
    return this.http.get<Device>(deviceURL).pipe(
      tap(() => this.log(`get device id=${id}`)),
      catchError(this.handleError<Device>(`get device id=${id}`))
    )
  }



  updateDevice(device: Device): Observable<any>{
    return this.http.put(this.devicesURL, device, this.httpOptions).pipe(
      tap(() => this.log(`updated device id=${device.id}`)),
      catchError(this.handleError<any>(`update device id=${device.id}`))
    );
  }



  addDevice(device:Device):Observable<Device>{
    return this.http.post<Device>(this.devicesURL, device, this.httpOptions).pipe(
      tap((newDevice: Device) => this.log(`added device id=${newDevice.id}`)),
      catchError(this.handleError<any>(`added device id=${device.id}`))
    );
  }



  deleteDevice(id: number):Observable<Device>{
    const deviceURL = `${this.devicesURL}/${id}`;
    return this.http.delete<Device>(deviceURL, this.httpOptions).pipe(
      tap(() => this.log(`deleted device id=${id}`)),
      catchError(this.handleError<Device>(`deleted device`))
    );
  }

  constructor(private http: HttpClient,
              private historyService: HistoryService) { }
}
