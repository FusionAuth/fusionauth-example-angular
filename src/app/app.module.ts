import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserDataFormComponent } from './user-data-form/user-data-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserDataFormComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
