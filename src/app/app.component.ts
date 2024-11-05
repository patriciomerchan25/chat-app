import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatFormComponent } from "./chat-form/chat-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ChatSockets';
}
