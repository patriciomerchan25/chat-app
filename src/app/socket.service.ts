import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4500', {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Origin": "http://localhost:4200"
      }
    });
    console.log('SocketService: Conectado al servidor Socket.IO');

    this.socket.on('connect', () => {
      console.log('SocketService: Conexión establecida');
    });

    this.socket.on('disconnect', () => {
      console.log('SocketService: Conexión perdida');
    });
  }

  sendMessage(message: string): void {
    console.log(`SocketService: Enviando mensaje - ${message}`);
    this.socket.emit('message', message);
  }

  getMessages(): Observable<string> {
    return new Observable<string>((observer) => {
      this.socket.on('message', (message: string) => {
        console.log(`SocketService: Mensaje recibido - ${message}`);
        observer.next(message);
      });
    });
  }
}