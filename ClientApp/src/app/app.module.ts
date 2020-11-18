import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ListComponent,
        ProfileComponent
    ],
    imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AllMaterialModules,
        SharedModule
    ],
    providers: [DataService, ConfigService],
    bootstrap: [AppComponent]
})
export class AppModule { }
