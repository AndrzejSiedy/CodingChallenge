import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

    private token = 'just test token';

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {

        // DEV NOTE: for other requests than document upload, make sure here, content type is set,
        // angular will set content-type when posting files
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ setHeaders: { 'Content-Type': 'application/json' } });
        }

        return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }


    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(this.addToken(req, this.token))
            .pipe(map(event => {
                console.warn('http interceptor updating token', event);
                if (event instanceof HttpResponse) {
                    if (!req.url.indexOf('token/create')) { // my api endpoint to avoid to trigger the interceptor when I refresh the token.
                        try {
                            // check tocken and refresh if required
                            console.warn('http interceptor updating token');
                        } catch (error) {
                            console.warn('http interceptor error', error);
                        }
                    }
                }
                return event;
            }));
    }
}

