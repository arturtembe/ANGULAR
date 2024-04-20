import { Component } from '@angular/core';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { Categoria } from '../../../../interfaces/Categoria';
import { ValidUser } from '../../../../helpers/validUser';

@Component({
  selector: 'app-view-categoria',
  templateUrl: './view-categoria.component.html',
  styleUrl: './view-categoria.component.scss'
})
export class ViewCategoriaComponent {
  
  dashboard="2";
  urlBack="/dashboard";
  
  categorias:Categoria[]=[];

  constructor(private categoriaService:CategoriaService,
    private userValid:ValidUser){
this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
    this.getCategoria();
  }

  ngOnInit():void{
  
  }

  removeCategoria(categoria:Categoria):void{
    this.categorias =this.categorias.filter((a)=>categoria.categoria!==a.categoria);
    let dataForm=new FormData();
    dataForm.append("id",`${categoria.id}`);
    this.categoriaService.remove(dataForm).subscribe(
      data=>{
        let info:any[]=data;
        if(info[0].status==1){
          //alert(info[0].msg);
        }
      }
    );
  }

  // API
  getCategoria():void{
    this.categoriaService.getAll().subscribe((categorias)=>(this.categorias=categorias));
  }

}
