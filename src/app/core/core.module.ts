import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataService} from './services/data.service';
import {SorterService} from './services/sorter.service';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ DataService, SorterService]
})
export class CoreModule { }
