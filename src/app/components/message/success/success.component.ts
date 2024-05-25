import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
  
  @Input() messageSucessError:boolean = false;
  @Input() title:string = 'Title';
  @Input() message:string = 'Some text in the Modal..';

  @Output() changeMessageSuccessError:EventEmitter<any>=new EventEmitter();

  handClick():void{
    this.changeMessageSuccessError.emit();
  }

}
