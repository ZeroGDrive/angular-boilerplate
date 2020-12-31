import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthStore} from '../auth/auth.store';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStore) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authStore.logout();
        location.reload();
      }

      const error = 'هناك مشكلة في الاتصال';
      return throwError(error);
    }));
  }
}
