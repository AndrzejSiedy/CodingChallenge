import { Injectable } from '@angular/core';
import { User, ServiceResponse } from '../models/models';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private webApiUrl = './api/user'

    constructor(private http: HttpClient) {

    }

    public getUsers(): Observable<ServiceResponse<User[]>> {
        return this.http
            .get<ServiceResponse<User[]>>(this.webApiUrl);
    }

    public getUser(id: number): Observable<ServiceResponse<User>> {
        return this.http
            .get<ServiceResponse<User>>(this.webApiUrl + '/' + id);
    }

    public delete(id: number): Observable<ServiceResponse<boolean>> {
        return this.http
            .delete<ServiceResponse<boolean>>(this.webApiUrl + '/' + id);
    }

}


