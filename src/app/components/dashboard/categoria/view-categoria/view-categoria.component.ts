import { Component } from '@angular/core';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { Categoria } from '../../../../interfaces/Categoria';
import { ValidUser } from '../../../../helpers/validUser';
import { ActivatedRoute } from '@angular/router';
import { ValidSlugHelper } from '../../../../helpers/validSlug.helpers';

@Component({
  selector: 'app-view-categoria',
  templateUrl: './view-categoria.component.html',
  styleUrl: './view-categoria.component.scss'
})
export class ViewCategoriaComponent {
  
  dashboard="2";
  urlBack="";
  
  categorias:Categoria[]=[];
  slug:string|null = ``;

  constructor(private categoriaService:CategoriaService,
    private userValid:ValidUser,
    private route:ActivatedRoute,
    private validSlugHelper:ValidSlugHelper){

    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");

    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
    this.getCategoria();

    this.urlBack =`/${this.slug}`
  }

  ngOnInit():void{
  
  }

  addCategoriaHandle(){
    //console.log(`${this.slug}`);
    
    location.href = `/${this.slug}/categoria/add`;
  }

  removeCategoria(categoria:Categoria):void{
    
    this.categoriaService.remove(categoria.id).subscribe(
      ()=>{
        this.categorias = this.categorias.filter((a)=>categoria.categoria!==a.categoria);        
      },
      error=>{
        alert(error.error.message)
        console.log(error.error);
      }
    );
  }

  // API
  getCategoria():void{
    //this.categoriaService.getAll().subscribe((categorias)=>(this.categorias=categorias));
    this.categoriaService.getAll().subscribe((categorias)=>{
      //console.log(categorias);
      this.categorias = categorias.categorias;
    },(error)=>{
      console.log(error.error);
    });
  }

}
