import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceResponse, User } from '../models/models';
import { UserService } from './user.service';

@Injectable()
export class UserProfileResolver implements Resolve<ServiceResponse<User>> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ServiceResponse<User>> {

        const userId = route.params['id'];

        return this.userService
            .getUser(userId);
    }

}
