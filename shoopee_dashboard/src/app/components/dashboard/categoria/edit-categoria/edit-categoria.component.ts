import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../../interfaces/Categoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { ValidUser } from '../../../../helpers/validUser';
import { ValidSlugHelper } from '../../../../helpers/validSlug.helpers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.scss'
})
export class EditCategoriaComponent {
  
  dashboard="2";
  urlBack="";

  form!:FormGroup;
  id:string|null = ``;
  categoria!:string;
  slug:string|null = ``;

  constructor(private categoriaService:CategoriaService,
              private _formBuilder:FormBuilder,
              private route:ActivatedRoute,
              private userValid:ValidUser,
              private validSlugHelper:ValidSlugHelper,
              private titleService: Title){
    // SLUG USER
    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");

    // EDIT ID SLUG
    this.validSlugHelper.verifySlug_ID_EDIT(route,`/${this.slug}/categoria`);
    this.id = this.route.snapshot.paramMap.get("id");
                
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
    
    // GET CATEGORIA ID
    this.getCategoria();

    this.urlBack =`/${this.slug}/categoria`;
  }

  ngOnInit():void{

    this.titleService.setTitle(`Edit Category - Shopee`);

    this.form=this._formBuilder.group({
      categoria:[""]
    })
  }

  //GET
  getCategoria():void{
    this.categoriaService.getItem(this.id).subscribe((data)=>{
      
      this.categoria = data.categoria.categoria;
      //console.log(data);
      
    },error=>{
      //console.log(error);
      location.href = `/${this.slug}/categoria`;
    });
  }

  editCategoria():void{
    
    if(this.form.value.categoria==""){
      alert("A categoria nao deve estar vazia!");
      return;
    }

    let dataForm:any=new FormData();
      dataForm.append("categoria",this.form.value.categoria);
      
      this.categoriaService.editItem(new URLSearchParams(dataForm),this.id).subscribe(data=>{
        
        location.href = `/${this.slug}/categoria`;
        
      },error=>{
        alert(error.error.message)
        //console.log(error.error);
        
      });

  }

}
