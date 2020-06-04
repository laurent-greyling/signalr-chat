import { Component, OnInit, NgZone } from '@angular/core';
import { AppSettings } from '../interfaces/appsettings.service';
import { AppSettingsService } from '../services/appsettings.service';
import { LoggerService } from '../services/logger.service';
import { ChatSignalRService } from '../services/signalr.service';
import { NotificationService } from '../services/notification.service';
import { ChatMessage } from '../Models/chatmessage.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  appSettings: AppSettings;

  title = 'ClientApp';
  txtMessage: string = '';
  uniqueID: string = new Date().getTime().toString();
  messages = new Array<ChatMessage>();
  message = new ChatMessage();

  notification: string = '';
  notifications = new Array<string>();

  constructor(
    private appSettingsService: AppSettingsService,
    private logger: LoggerService,
    private signalrService: ChatSignalRService,
    private notificationService: NotificationService,
    private _ngZone: NgZone) {

    //Get the environment variables
    appSettingsService.loadEnvironment().subscribe(config => this.appSettings = config);

    this.subscribeToEvents();

  }

  ngOnInit() {
    this.nn();
  }

  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new ChatMessage();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = "sent";
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.signalrService.sendChatMessage(this.message);
      this.txtMessage = '';
    }
  }


  onType(typingValue: string): void {
    this.notification = typingValue;
    this.notifications.push(this.notification);
    this.notificationService.sendChatMessage(this.notification);
    this.notification = '';
  }

  private nn(): void {
    this.notificationService.messageReceived.subscribe((notify: string) => {
      this._ngZone.run(() => {
        this.notification = notify;
      })
    }); 
  }

  private subscribeToEvents(): void {

    this.signalrService.messageReceived.subscribe((message: ChatMessage) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = "received";
          this.messages.push(message);
        }
      });
    });   
  }
}
