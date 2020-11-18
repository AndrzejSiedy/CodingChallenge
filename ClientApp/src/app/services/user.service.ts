import { Injectable } from '@angular/core';
import { User, ServiceResponse } from '../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
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

    public create(user: User): Observable<ServiceResponse<User>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http
            .post<ServiceResponse<User>>(this.webApiUrl, JSON.stringify(user), { headers: headers });
    }

    public update(user: User): Observable<ServiceResponse<User>> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http
            .put<ServiceResponse<User>>(this.webApiUrl, JSON.stringify(user), { headers: headers });
    }

    public delete(id: number): Observable<ServiceResponse<boolean>> {
        return this.http
            .delete<ServiceResponse<boolean>>(this.webApiUrl + '/' + id);
    }

}


