import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message/services/message.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent {
  messageControl = new FormControl('', [Validators.required]);
  senderName = 'Utente 1';

  constructor(private messageService: MessageService) { }

  sendMessage(): void {
    if (this.messageControl.valid && this.messageControl.value) {
      this.messageService.sendMessage(this.messageControl.value, this.senderName);
      this.messageControl.reset();
    }
  }

  resetCounter(): void {
    this.messageService.resetCounter();
  }
}
