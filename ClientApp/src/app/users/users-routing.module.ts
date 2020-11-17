import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileResolver } from '../services/user-profile.resolver';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    { path: '', component: ListComponent },
    {
        path: 'create', component: ProfileComponent
    },
    {
        path: 'edit/:id',
        component: ProfileComponent,
        resolve: {
            editUser: UserProfileResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }

