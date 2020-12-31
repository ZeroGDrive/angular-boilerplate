import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponse, LoginResult} from '../core.interface';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: any): Observable<BaseResponse<LoginResult>> {
    return this.http.post<BaseResponse<LoginResult>>(`https://localhost:5001/api/UserManagement/login`, user);
  }
}
