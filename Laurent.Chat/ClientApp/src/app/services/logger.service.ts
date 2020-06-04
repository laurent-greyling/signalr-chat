import { Router, ActivatedRouteSnapshot, ResolveEnd } from "@angular/router";
import { Injectable } from "@angular/core";
import { filter } from "rxjs/operators";
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AppSettingsService } from "./appsettings.service";

@Injectable()
export class LoggerService {

  public appInsights: ApplicationInsights;

  constructor(private router: Router, private appSettings: AppSettingsService) { }

  loadLogger(instrumentationKey: string) {

    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: instrumentationKey
      }
    });

    this.appInsights.loadAppInsights();

    this.router.events.pipe(filter(event => event instanceof ResolveEnd)).subscribe((event: ResolveEnd) => {

      const activatedComponent = this.getActivatedComponent(event.state.root);
      if (activatedComponent) {
        this.logPageView(
          `${activatedComponent.name} ${this.getRouteTemplate(event.state.root)}`,
          event.urlAfterRedirects);
      }

    });
  }

  setUserId(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId);
  }

  clearUserId() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  //Logs page views
  //Will show for every endpoint e.g. /upload or /home
  logPageView(name?: string, uri?: string) {
    this.appInsights.trackPageView({ name, uri });
  }

  //Log exceptions
  logError(error: Error) {
    this.appInsights.trackException({ exception: error });
  }

  //logs custom event information
  logCustomEvent(event: string, properties?: object) {
    this.appInsights.trackEvent({ name: event, properties: properties });
  }

  private getActivatedComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.firstChild) {
      return this.getActivatedComponent(snapshot.firstChild);
    }

    return snapshot.component;
  }

  private getRouteTemplate(snapshot: ActivatedRouteSnapshot): string {
    let path = '';
    if (snapshot.routeConfig) {
      path += snapshot.routeConfig.path;
    }

    if (snapshot.firstChild) {
      return path + this.getRouteTemplate(snapshot.firstChild);
    }

    return path;
  }
}
