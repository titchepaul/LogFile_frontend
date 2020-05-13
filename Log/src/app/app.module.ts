import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AffichComponent } from './affich/affich.component';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { FiltreComponent } from './filtre/filtre.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';


//import {ToastrModule} from 'ngx-toastr';
//import { AlertModule } from 'ngx-bootstrap';

const routes: Routes = [
  { path: "", component: HomeComponent }, // localhost:4200/home
  {path:'table/:tableName', component:AffichComponent},
  {path:'filtre',component:FiltreComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    AffichComponent,
    FiltreComponent
  ],
  imports: [
    BrowserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    //ToastrModule.forRoot(),
    //AlertModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
