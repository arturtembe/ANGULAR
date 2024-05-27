import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.scss'
})
export class HeaderDashboardComponent {

  @Input() dashboard='';
  @Input() urlBack='';

  logout(){
    sessionStorage.setItem("tokenGTask","");
    location.href="/login";
  }

}
