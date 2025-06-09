import { NgModule } from '@angular/core';
import { MessageHandlerComponent } from './components/message-handler/message-handler.component';
import { SenderComponent } from './components/sender/sender.component';
import { ReceiverComponent } from './components/receiver/receiver.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MessageHandlerComponent, SenderComponent, ReceiverComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MessageHandlerComponent, SenderComponent, ReceiverComponent],
})
export class MessageModule {}
