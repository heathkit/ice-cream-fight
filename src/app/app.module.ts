import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdCoreModule, MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

import { AppComponent } from './app.component';
import { IceCreamTableComponent } from './ice-cream-table/ice-cream-table.component';

@NgModule({
  exports: [
    CdkTableModule,
    MdCoreModule,
    MdTableModule,
  ]
})
export class IceCreamMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    IceCreamTableComponent
  ],
  imports: [
    BrowserModule,
    IceCreamMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
