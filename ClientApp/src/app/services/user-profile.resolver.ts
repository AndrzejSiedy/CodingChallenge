import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ServiceResponse, User } from '../models/models';
import { UserService } from './user.service';

@Injectable()
export class UserProfileResolver implements Resolve<ServiceResponse<User>> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<ServiceResponse<User>> {

        const userId = route.params['id'];

        return this.userService
            .getUser(userId);
            //.pipe(first());
            //.pipe(map(resp => { return resp.data }));

    }


}
