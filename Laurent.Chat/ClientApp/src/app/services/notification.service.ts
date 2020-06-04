import { EventEmitter, Injectable } from '@angular/core'
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'

@Injectable()
export class NotificationService {

  hubConnection: HubConnection;
  messageReceived = new EventEmitter<string>();
  connectionEstablished = new EventEmitter<Boolean>();
  connectionIsEstablished = false;

  constructor() {
    this.createConnection();
    this.registerEvents();
    this.startConnection();
  }

  sendChatMessage(message: string) {
    this.hubConnection.invoke('SendMessage', message);
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(window.location.href + 'ChatHub')
      .build();
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      }).catch(err => {
        console.error(err);
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerEvents(): void {
    this.hubConnection.on('ReceiveMessage', (message: any) => {
      console.log('message received:' + message);
      this.messageReceived.emit(message);
    })
  }
}  
