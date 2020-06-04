import { Injectable } from "@angular/core";
import { AppSettingsService } from "./appsettings.service";
import { LoggerService } from "./logger.service";
import { AppSettings } from "../interfaces/appsettings.service";

@Injectable({ providedIn: 'root' })
export class StartUpService {
  constructor(private configService: AppSettingsService, private logger: LoggerService) { }

  public initializeAppSettings(): Promise<AppSettings> {
    return this.configService.loadEnvironment().toPromise();
  }

  public async initializeApp() {
    let appSettings = await this.initializeAppSettings();
    this.logger.loadLogger(appSettings.appInsightsInstrumentationKey);
  }
}
