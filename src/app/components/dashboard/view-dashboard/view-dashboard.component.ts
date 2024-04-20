import { Component } from '@angular/core';
import { ValidUser } from '../../../helpers/validUser';

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrl: './view-dashboard.component.scss'
})
export class ViewDashboardComponent {
  dashboard="0";

  constructor(private userValid:ValidUser){
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");   
  }

}
