import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent } from './list/list.component';
import { AllMaterialModules } from '../material-module';
import { UserProfileResolver } from '../services/user-profile.resolver';
import { UserService } from '../services/user.service';


@NgModule({
    declarations: [
        UsersComponent,
        ProfileComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AllMaterialModules,
        UsersRoutingModule
    ],
    providers: [
        UserService,
        UserProfileResolver
    ]
})
export class UsersModule { }
