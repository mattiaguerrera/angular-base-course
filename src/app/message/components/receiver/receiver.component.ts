import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message, MessageService } from '../../services/message.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  messageCount = 0;
  
  private messagesSubscription!: Subscription;
  private counterSubscription!: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Sottoscrizione ai messaggi
    this.messagesSubscription = this.messageService.messages$.subscribe(
      message => {
        this.messages.push(message);
        
        // Limita a mostrare solo gli ultimi 10 messaggi
        if (this.messages.length > 10) {
          this.messages = this.messages.slice(-10);
        }
      }
    );
    
    // Sottoscrizione al contatore
    this.counterSubscription = this.messageService.counter$.subscribe(
      count => {
        this.messageCount = count;
      }
    );
  }

  ngOnDestroy(): void {
    // Annulla le sottoscrizioni quando il componente viene distrutto
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
    
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
