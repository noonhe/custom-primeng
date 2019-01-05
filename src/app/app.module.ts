import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengComponentsModule } from './primeng-components.module';
import { CustomPrimengComponentsModule } from './custom-primeng-components/custom-primeng-components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    PrimengComponentsModule,
    CustomPrimengComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
