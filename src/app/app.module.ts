import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TitleFormComponent } from './components/title-form/title-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, DialogService, InputTextModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    TitleFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DynamicDialogModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [DialogService, DataService],
  entryComponents: [TitleFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
