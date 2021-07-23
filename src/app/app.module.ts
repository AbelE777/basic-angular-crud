import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { TablaInfoComponent } from './components/tabla-info/tabla-info.component';
import { PersonasService } from './services/personas.service';
import { GroupedQueryComponent } from './components/grouped-query/grouped-query.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    TablaInfoComponent,
    GroupedQueryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    PersonasService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
