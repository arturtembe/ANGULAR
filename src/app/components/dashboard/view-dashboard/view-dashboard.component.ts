import { Component } from '@angular/core';
import { ValidUser } from '../../../helpers/validUser';
import { ActivatedRoute } from '@angular/router';
import { ValidSlugHelper } from '../../../helpers/validSlug.helpers';

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrl: './view-dashboard.component.scss'
})
export class ViewDashboardComponent {
  
  dashboard="0";

  categoriaRouter = `/dashboard/categoria`;
  slug:string|null = ``;

  constructor(private userValid:ValidUser,
    private route:ActivatedRoute,
    private validSlugHelper:ValidSlugHelper){
    
    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");
    
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");   
  }

  productoHandle(){
    location.href = `/${this.slug}/product`;
  }

  categoriaHandle(){
    location.href = `/${this.slug}/categoria`;
  }

}
