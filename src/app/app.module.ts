import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {AppConfig} from '../config/app-config';
import {JsonAppConfigService} from '../config/json-app-config.service';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';

export function INIT_CONFIG(jsonAppConfigService: JsonAppConfigService): () => Promise<any> {
  return () => {
    return jsonAppConfigService.load();
  };
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: JsonAppConfigService
    }, {
      provide: APP_INITIALIZER,
      deps: [JsonAppConfigService],
      multi: true,
      useFactory: INIT_CONFIG
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
