import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengComponentsModule } from './primeng-components.module';
import { CustomPrimengComponentsModule } from './custom-primeng-components/custom-primeng-components.module';
import { FormsModule } from '@angular/forms';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
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
