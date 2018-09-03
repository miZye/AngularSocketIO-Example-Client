import { Component, OnInit } from '@angular/core';


import {SocketService} from '../services/socket.service';
import { Message, User } from '../../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: User;

  messages: Message[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit() {

    const id = this.getRandomId().toString();

    this.user = {
      name: id
    }

    this.initToConnection();
  }

  private initToConnection(): void {
    this.socketService.initSocket();

    this.socketService.broadcast()
      .subscribe((message:Message) => {
        this.messages.push(message);
      })
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  sendMsg(): void {

    this.socketService.send({
      from: this.user,
      content: "hi"
    });
  }
}
