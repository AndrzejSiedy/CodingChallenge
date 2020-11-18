import { Injectable } from '@angular/core';
import { User, ServiceResponse } from '../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

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

    public update(user: User) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http
            .put<User>(this.webApiUrl, JSON.stringify(user), { headers: headers });
    }

    public delete(id: number): Observable<ServiceResponse<boolean>> {
        return this.http
            .delete<ServiceResponse<boolean>>(this.webApiUrl + '/' + id);
    }

}


