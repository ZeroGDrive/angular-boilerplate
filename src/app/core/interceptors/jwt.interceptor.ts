import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthStore} from '../auth/auth.store';
import {AppConfig} from '../../../config/app-config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStore,
              private appConfig: AppConfig) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const token = sessionStorage.getItem('token');
    const baseURL = request.url.startsWith(this.appConfig.baseURL);
    if (token && baseURL) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
