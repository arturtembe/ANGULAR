import { Component,OnInit } from '@angular/core';
import { Categoria } from '../../../../interfaces/Categoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidUser } from '../../../../helpers/validUser';
import { ActivatedRoute } from '@angular/router';
import { ValidSlugHelper } from '../../../../helpers/validSlug.helpers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.scss'
})

export class AddCategoriaComponent {

  dashboard="2";
  urlBack="";

  form!:FormGroup;

  categoria:Categoria[]=[];
  slug:string|null = ``;

  constructor(private categoriaService:CategoriaService,
              private _formBuilder:FormBuilder,
              private userValid:ValidUser,
              private route:ActivatedRoute,
              private validSlugHelper:ValidSlugHelper,
              private titleService: Title){

    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");
    
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");

    this.urlBack =`/${this.slug}/categoria`;
  }

  ngOnInit():void{

    this.titleService.setTitle(`Add Category - Shopee`);

    this.form=this._formBuilder.group({
      categoria:[""]
    })
  }

  addCategoria():void{
    
    if(this.form.value.categoria==""){
      alert("Categoria nao dever estar vazia");
      return;
    }

    let dataForm:any=new FormData();
      dataForm.append("categoria",this.form.value.categoria);
      
      this.categoriaService.addItem(new URLSearchParams(dataForm)).subscribe(data=>{
        
        location.href = `/${this.slug}/categoria`;
        
      },(error)=>{
        console.log(error.error);
      });

  }

}
