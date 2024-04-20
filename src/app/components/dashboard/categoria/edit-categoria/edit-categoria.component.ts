import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../../interfaces/Categoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { ValidUser } from '../../../../helpers/validUser';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrl: './edit-categoria.component.scss'
})
export class EditCategoriaComponent {
  
  dashboard="2";
  urlBack="/dashboard/categoria";

  form!:FormGroup;
  id!:number;
  categoria!:string;

  constructor(private categoriaService:CategoriaService,
              private _formBuilder:FormBuilder,
              private route:ActivatedRoute,
              private userValid:ValidUser){
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
                this.getCategoria();
  }

  ngOnInit():void{
    this.form=this._formBuilder.group({
      categoria:[""]
    })
  }


  //GET
  getCategoria():void{
    this.id=Number(this.route.snapshot.paramMap.get("id"));
    this.categoriaService.getItem(this.id).subscribe((categorias)=>(this.categoria=categorias[0].categoria));
  }

  editCategoria():void{
    
    if(this.form.value.categoria!=""){
      let dataForm=new FormData();
      dataForm.append("categoria",this.form.value.categoria);
      dataForm.append("id",`${this.id}`);
      
      //console.log(this.form.value.id);
      
      this.categoriaService.editItem(dataForm).subscribe(data=>{
        
        let info:any[]=data;
        if(info[0].status==1){
          alert(info[0].msg);
        }
        
      });
    }

  }

}
