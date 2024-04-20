import { Component,OnInit } from '@angular/core';

import { Categoria } from '../../../../interfaces/Categoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidUser } from '../../../../helpers/validUser';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrl: './add-categoria.component.scss'
})

export class AddCategoriaComponent {

  dashboard="2";
  urlBack="/dashboard/categoria";

  form!:FormGroup;

  categoria:Categoria[]=[];

  constructor(private categoriaService:CategoriaService,
              private _formBuilder:FormBuilder,
              private userValid:ValidUser){
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
  }

  ngOnInit():void{
    this.form=this._formBuilder.group({
      categoria:[""]
    })
  }

  addCategoria():void{
    
    if(this.form.value.categoria!=""){
      let dataForm=new FormData();
      dataForm.append("categoria",this.form.value.categoria);
      dataForm.append("idUser",`${1}`);
      this.categoriaService.addItem(dataForm).subscribe(data=>{
        let info:any[]=data;
        if(info[0].status==1){
          alert(info[0].msg);
        }
      });
    }
    //   
  }

}
