import { Routes } from '@angular/router';
import { ChatFormComponent } from "./chat-form/chat-form.component";


export const routes: Routes = [
    { path: 'chat', component: ChatFormComponent },
    { path: '', redirectTo: '/chat', pathMatch: 'full' }
  ];
