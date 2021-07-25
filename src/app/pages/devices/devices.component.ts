import {Component, OnInit, ViewChild} from '@angular/core';
import {Device, compare, Available, FilterOptions} from "../../interfaces/device";
import {DeviceService} from "../../services/device.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {FormControl, Validators} from "@angular/forms";
import {MatSelect} from "@angular/material/select";
import {MatOption} from "@angular/material/core";
import {take} from "rxjs/operators";


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  //Table-columns
  public displayedColumns: string[] = ['id', 'deviceName', 'rating', 'price'];

  //Table data
  public dataSource: any = [];

  //Table searching, sorting and filtering
  public searchText: string = '';
  public sortBy?: Sort;
  public filterOptions: FilterOptions = {
    name: '',
    price: {from: 0, to: 9999},
    availability: [],
    soldPieces: {from: 0, to: 9999},
    rating: {from: 0, to: 5}
  };

  //Form Controls
  public devicesAvails = new FormControl();
  public availKeys: string[] = ['Available', 'Expected', 'Not available'];
  public availVals: number[] = (() => {
    let result: any[] = [];
    for (let i in Available)
      result.push(parseInt(i, 10));
    return result.splice(0, Object.keys(Available).length / 2);
  })();

  public ratingFromControl = new FormControl('', [Validators.max(5), Validators.min(0)])
  public ratingToControl = new FormControl('', [Validators.max(5), Validators.min(0)])
  public priceFromControl = new FormControl('', [Validators.max(9999), Validators.min(0)])
  public priceToControl = new FormControl('', [Validators.max(9999), Validators.min(0)])
  public soldPiecesFromControl = new FormControl('', [Validators.max(9999), Validators.min(0)])
  public soldPiecesToControl = new FormControl('', [Validators.max(9999), Validators.min(0)])

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild('matSelect') matSelect?: MatSelect;

  constructor(private deviceService: DeviceService) {
  }


  ngOnInit(): void {
    this.tableHandler();
  }

  public resetFilters(): void {
    this.filterOptions = {
      name: '',
      price: {from: 0, to: 9999},
      availability: [],
      soldPieces: {from: 0, to: 9999},
      rating: {from: 0, to: 5}
    };
  }

  public activeFilters(): number {
    let active = 0;
    this.filterOptions.name !== '' ? active++ : {};
    this.filterOptions.price.from != 0 || this.filterOptions.price.to != 9999 ? active++ : {};
    this.filterOptions.availability.length !== 0 ? active++ : {};
    this.filterOptions.soldPieces.from !== 0 || this.filterOptions.soldPieces.to !== 9999 ? active++ : {};
    this.filterOptions.rating.from != 0 || this.filterOptions.rating.to != 5 ? active++ : {};
    return active;
  };

  public resetSearch(): void {
    this.searchText = '';
  }

  public resetSelectFilter(): void {
    this.matSelect?.options.forEach((data: MatOption) => data.deselect());
  }

  public tableHandler(): void {
    if (this.paginator) this.paginator.pageIndex = 0;

    this.deviceService
      .getParametrizedTable(this.sortBy, this.activeFilters() > 0 ? this.filterOptions : undefined, this.searchText)
      .pipe(take<Device[]>(1))
      .subscribe(devices => {

        //Check loadItems method
        this.dataSource
          ? this.dataSource = new MatTableDataSource<Device>(devices)
          : this.dataSource = (devices);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
