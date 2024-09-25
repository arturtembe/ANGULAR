import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-local-image',
  templateUrl: './local-image.component.html',
  styleUrl: './local-image.component.scss'
})
export class LocalImageComponent {
  @Input() visualizador:boolean = false;
  @Input() title:string = 'Title';
  @Input() message:string = 'Some text in the Modal..';
  @Input() url:string = ``;

  @Output() onCloseVisualizador:EventEmitter<any>=new EventEmitter();

  closePopup():void{
    this.onCloseVisualizador.emit();
  }

}
