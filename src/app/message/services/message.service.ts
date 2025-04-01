import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export interface Message {
  text: string;
  sender: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // Subject normale: gli abbonati ricevono solo i valori emessi dopo la sottoscrizione
  private messageSubject = new Subject<Message>();
  
  // BehaviorSubject: mantiene l'ultimo valore e lo fornisce ai nuovi abbonati
  private counterSubject = new BehaviorSubject<number>(0);
  
  // Esponi gli observable pubblicamente ma non i subject
  public messages$ = this.messageSubject.asObservable();
  public counter$ = this.counterSubject.asObservable();

  constructor() { }

  // Invia un nuovo messaggio
  sendMessage(text: string, sender: string): void {
    const newMessage: Message = {
      text,
      sender,
      timestamp: new Date()
    };
    
    this.messageSubject.next(newMessage);
    
    // Incrementa il contatore dei messaggi
    const currentCount = this.counterSubject.value;
    this.counterSubject.next(currentCount + 1);
  }

  // Resetta il contatore
  resetCounter(): void {
    this.counterSubject.next(0);
  }
}
