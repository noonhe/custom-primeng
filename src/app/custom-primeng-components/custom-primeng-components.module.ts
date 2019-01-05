import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimengComponentsModule} from '../primeng-components.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomTableComponent } from './table/table.component';

@NgModule({
  declarations: [CustomTableComponent],
  imports: [
    CommonModule,
    PrimengComponentsModule,
    FormsModule,
    BrowserModule,
  ],
  exports:[CustomTableComponent],
})
export class CustomPrimengComponentsModule { }
