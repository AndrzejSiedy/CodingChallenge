import { Injectable } from '@angular/core';
import { ServiceResponse, ViewConfig } from '../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public viewConfig: ViewConfig;

    private webApiUrl = './api/config'

    constructor(private http: HttpClient) {
        this.getConfig().subscribe(resp => {
                this.viewConfig = resp.data;
            });
    }

    private getConfig(): Observable<ServiceResponse<ViewConfig>> {
        return this.http
            .get<ServiceResponse<ViewConfig>>(this.webApiUrl);
    }
}


