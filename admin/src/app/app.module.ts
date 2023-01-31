import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './components/data/data.component';
import { LoginComponent } from './components/login/login.component';
import { AggregateComponent } from './components/aggregate/aggregate.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    LoginComponent,
    AggregateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
