import {Injectable} from '@angular/core';
import {AppConfig} from './app-config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonAppConfigService extends AppConfig {

  constructor(private http: HttpClient) {
    super();
  }

  load(): Promise<any> {
    return this.http.get<AppConfig>('app-config.json')
      .toPromise()
      .then(data => {
        this.baseURL = data.baseURL;
      })
      .catch(() => {
      });
  }
}
