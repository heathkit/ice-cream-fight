import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdCoreModule, MdInputModule, MdTableModule, MdToolbarModule, MdButtonModule, MdIconModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IceCreamTableComponent } from './ice-cream-table/ice-cream-table.component';
import { NewFlavorComponent } from './new-flavor/new-flavor.component';

const appRoutes: Routes = [
  {
    path: 'new',
    component: NewFlavorComponent,
  },
  {
    path: 'flavors',
    component: IceCreamTableComponent,
  },
  {
    path: '',
    redirectTo: '/flavors',
    pathMatch: 'full'
  }
];

@NgModule({
  exports: [
    CdkTableModule,
    MdCoreModule,
    MdTableModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdToolbarModule
  ]
})
export class IceCreamMaterialModule { }

@NgModule({
  declarations: [
    AppComponent,
    IceCreamTableComponent,
    NewFlavorComponent
  ],
  imports: [
    BrowserModule,
    IceCreamMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes, { useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
