import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../../models/message.model';

import * as io from 'socket.io-client';

const SE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;


  constructor() { }

  public initSocket(): void {
    this.socket = io(SE_URL);
    console.log(this.socket);
  }

  public send(message): void {
    this.socket.emit('message', message);
  }

  public broadcast(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('messagechat', (data: Message) => {
        observer.next(data);
      });
    });
  }
}
