import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './admin/list/list.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'admin', component: ListComponent },
    { path: 'admin/create', component: ProfileComponent },
    { path: 'admin/edit/:id', component: ProfileComponent },
    { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
    { path: '404', component: NotFoundComponent },
    { path: '500', component: ServerErrorComponent },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
