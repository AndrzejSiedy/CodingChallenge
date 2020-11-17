import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './admin/list/list.component';
import { ProfileComponent } from './admin/profile/profile.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: ListComponent },
    { path: 'admin/create', component: ProfileComponent },
    { path: 'admin/edit/:id', component: ProfileComponent },
    { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
