import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { ListComponent } from './admin/list/list.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AllMaterialModules } from './material-module';
import { ConfigService } from './services/config.service';
import { SharedModule } from './shared/shared.module';
import { AuthHttpInterceptor } from './services/auth-httpInterceptor.service';
import { EncrDecrService } from './services/encr-decr.service';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ListComponent,
        ProfileComponent,
        NotFoundComponent,
        ServerErrorComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AllMaterialModules,
        SharedModule,
    ],
    providers: [
        DataService,
        ConfigService,
        EncrDecrService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
