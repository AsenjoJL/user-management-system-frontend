import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components/alert.component';
import { jwtInterceptor } from './_helpers';
import { errorInterceptor } from './_helpers/error.interceptor'; // Adjust the path as needed

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        AlertComponent,
        AppComponent  // Move to imports since it's standalone
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useValue: jwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useValue: errorInterceptor, multi: true }
    ]
})
export class AppModule { }