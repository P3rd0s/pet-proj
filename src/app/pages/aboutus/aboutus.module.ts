import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutusComponent } from './aboutus.component';
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    AboutusComponent
  ],
  imports: [
    CommonModule,
    AboutusRoutingModule,
    MatCardModule,
    MatRadioModule,
    MatListModule
  ]
})
export class AboutusModule { }
