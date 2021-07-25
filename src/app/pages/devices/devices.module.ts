import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatBadgeModule} from "@angular/material/badge";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import {NgxSliderModule} from "@angular-slider/ngx-slider";


@NgModule({
  declarations: [
    DevicesComponent
  ],
    imports: [
        CommonModule,
        DevicesRoutingModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatBadgeModule,
        MatExpansionModule,
        MatSliderModule,
        MatSelectModule,
        ReactiveFormsModule,
        NgxSliderModule

    ]
})
export class DevicesModule { }
