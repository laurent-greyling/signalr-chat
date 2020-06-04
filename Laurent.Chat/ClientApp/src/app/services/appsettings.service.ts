import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppSettings } from "../interfaces/appsettings.service";
import { HttpClient } from "@angular/common/http";
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class AppSettingsService {

  private configuration$: Observable<AppSettings>;

  constructor(private http: HttpClient) {
  }

  // Using shareReplay, the actual HTTP call will only be called once
  // every other call will return a cached version of the response,
  // saving precious resources
  public loadEnvironment(): Observable<AppSettings> {
    if (!this.configuration$) {
      this.configuration$ = this.http.get<AppSettings>(`/settings`).pipe(
        shareReplay(1)
      );
    }

    return this.configuration$;
  }
}
