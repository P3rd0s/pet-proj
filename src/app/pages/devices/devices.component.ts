import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Device, compare, Available, FilterOptions} from "../../interfaces/device";
import {Subscription} from "rxjs";
import {DeviceService} from "../../services/device.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {FormControl} from "@angular/forms";


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  //Subscriptions
  subscriptions: Subscription[] = [];

  //Table-columns
  displayedColumns: string[] = ['id', 'deviceName', 'rating', 'price'];

  //Table data
  dataSource:any = [];

  //Table searching, sorting and filtering
  searchText: string = '';
  sortBy?: Sort;
  filterOptions: FilterOptions = {
    name: '',
    price: {from: 0, to:9999},
    availability: [],
    soldPieces: {from: 0, to:9999},
    rating: {from: 0, to:5}
  };

  devicesAvails = new FormControl();
  devicesAvailableList: string[] = ['Available', 'Expected', 'Not available'];


  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private deviceService: DeviceService) { }



  ngOnInit(): void {
    this.tableHandler();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

  resetFilters() {
    this.filterOptions = {
      name: '',
      price: {from: 0, to:9999},
      availability: [],
      soldPieces: {from: 0, to:9999},
      rating: {from: 0, to:5}
    };
  }

  activeFilters(): number {
    let active = 0;
    this.filterOptions.name !== '' ? active++ : {};
    this.filterOptions.price.from!=0 || this.filterOptions.price.to!=9999 ? active++ : {};
    this.filterOptions.availability.length !==0 ? active++ : {};
    this.filterOptions.soldPieces.from !== 0 || this.filterOptions.soldPieces.to !== 9999 ? active++ : {};
    this.filterOptions.rating.from!= 0 || this.filterOptions.rating.to != 5 ? active++ : {};
    return active;
  };

  resetSearch() {
    this.searchText = '';
  }

  tableHandler() {
    if(this.paginator) this.paginator.pageIndex = 0;


    this.deviceService
      .getParametrizedTable(this.sortBy, this.activeFilters() > 0 ? this.filterOptions: undefined, this.searchText)
      .subscribe(devices => {

            this.dataSource = new MatTableDataSource<Device>(devices);

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

      });

  }
}
