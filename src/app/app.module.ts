


//import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';

import { AddProductComponent } from './UI/add-product/add-product.component';
import { HomeComponent } from './UI/home/home.component';
import { ProductGridComponent } from './UI/product-grid/product-grid.component';
import { BtnDeleteCellRendererComponent } from './UI/GridComponents/btn-delete-cellRenderer/btn-delete-cellRenderer.component';
import { BtnUpdateICellRendererComponent } from './UI/GridComponents/btn-update-cellRenderer/btn-update-cellRenderer.component';
import { CheckboxRendererComponent } from './UI/GridComponents/checkbox-renderer/checkbox-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    HomeComponent,
    ProductGridComponent,
    BtnDeleteCellRendererComponent,
    BtnUpdateICellRendererComponent,
    CheckboxRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
