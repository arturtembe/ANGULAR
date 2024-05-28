import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boxmessage',
  templateUrl: './boxmessage.component.html',
  styleUrl: './boxmessage.component.scss'
})
export class BoxmessageComponent {

  @Input() tipoMessage = 'success';
  @Input() message = 'Ola Mundo';

  @Output() changeCloseBoxMessage:EventEmitter<any>=new EventEmitter();

  handClick():void{
    this.changeCloseBoxMessage.emit();
  }

}
