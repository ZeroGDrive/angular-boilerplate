import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Operation} from '../core.interface';
import {AuthService} from './auth.service';
import {map, shareReplay, switchMap, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private subject$ = new BehaviorSubject<string | null>(null);
  private token$ = this.subject$.asObservable();
  loggedIn$ = new Observable<boolean>();

  constructor(private authService: AuthService) {
    this.subject$.next(sessionStorage.getItem('token'));
    this.loggedIn$ = this.token$.pipe(
      // if null return false
      map(token => !!token),
      shareReplay()
    );
  }

  login(user: any): Observable<boolean> {
    return this.authService.login(user).pipe(
      tap(res => {
        if (res.operationState === Operation.Success) {
          this.subject$.next(res.result.token);
          sessionStorage.setItem('token', res.result.token);
        } else {
          // this.messages.showErrors(res.message);
          this.subject$.next(null);
        }
      }),
      switchMap(() => this.loggedIn$),
      shareReplay()
    );
    // return this.loading.showLoaderUntilCompleted(login$);
  }

  logout(): void {
    this.subject$.next(null);
    sessionStorage.removeItem('token');
  }
}
