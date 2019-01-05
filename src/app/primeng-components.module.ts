import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    TableModule,
    PaginatorModule
  ],
  exports:[
    TableModule,
    PaginatorModule
  ]
})
export class PrimengComponentsModule { }
