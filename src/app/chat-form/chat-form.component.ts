import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-chat-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {
  username: string = '';
  message: string = '';
  messages: string[] = [];
  isConnected: boolean = false;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
      console.log(`ChatFormComponent: Mensaje recibido en Angular - ${message}`);
    });
  }

  connect(): void {
    if (this.username.trim()) {
      this.isConnected = true;
      console.log(`ChatFormComponent: Usuario ${this.username} conectado`);
    }
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.socketService.sendMessage(`${this.username}: ${this.message}`);
      console.log(`ChatFormComponent: Mensaje enviado - ${this.username}: ${this.message}`);
      this.message = '';
    }
  }
}