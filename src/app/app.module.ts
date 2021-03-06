import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TheLibModule } from 'projects/the-lib/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TheLibModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
