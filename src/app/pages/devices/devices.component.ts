import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Device, compare} from "../../interfaces/device";
import {Subscription} from "rxjs";
import {DeviceService} from "../../services/device.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  //devices: Device[] =[];
  searchText: string = '';
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['id', 'deviceName', 'rating', 'price'];
  dataSource:any = [];
  defaultSort: Sort = {active:'', direction: ''}
  panelOpenState: boolean = true;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private deviceService: DeviceService) { }



  ngOnInit(): void {
    this.getDevicesBy('id', true, '');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  changeTable(sort: Sort, search:string){

    if(this.paginator) this.paginator.pageIndex = 0;

    console.log(this.subscriptions);

    //Wrong action, but now I dont know, how use takeUntil to unsubscribe
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

    search = search.trim().toLowerCase();
    this.getDevicesBy(sort.active, sort.direction === 'asc', search);
  }

  getDevicesBy(sortedBy: string, isAbs: boolean, search: string): void {
    this.subscriptions.push(this.deviceService.getDevicesBy(sortedBy, isAbs, search)
      .subscribe(devices => {

        this.dataSource = new MatTableDataSource<Device>(devices);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }));
  }
}
