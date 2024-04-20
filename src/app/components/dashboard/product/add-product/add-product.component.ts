import { Component } from '@angular/core';
import { ProductoService } from '../../../../services/producto/producto.service';
import { Producto } from '../../../../interfaces/Producto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../../interfaces/Categoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ValidUser } from '../../../../helpers/validUser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  dashboard="1";
  urlBack="/dashboard/product";

  form!:FormGroup;

  producto:Producto[]=[];
  categorias:Categoria[]=[];

  constructor(private productoService:ProductoService,
    private categoriaService:CategoriaService,
              private _formBuilder:FormBuilder,
              private userValid:ValidUser){
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
              this.getCategoria();
  }

  ngOnInit():void{

    this.form=this._formBuilder.group({
      nome:[""],
      precoVenda:[0],
      categoria:[0],
      filetoupload:[],
      desc:[""]
    })
    
  }

  getCategoria():void{
    this.categoriaService.getAll().subscribe((categorias)=>(this.categorias=categorias));
  }

  addProducto():void{
    
    if(this.form.value.nome!="" && this.form.value.precoVenda>0
      && this.form.value.categoria>0 && this.form.value.filetoupload!=null
    ){

      let dataForm:any=new FormData();
      dataForm.append("nome",this.form.value.nome);
      dataForm.append("precoVenda",this.form.value.precoVenda);
      dataForm.append("categoria",this.form.value.categoria);
      let dd:any=document.getElementById("filetoupload");
      dataForm.append("filetoupload",dd.files[0]);
      dataForm.append("desc",this.form.value.desc);
      dataForm.append("idUser",`${1}`);
      
      //console.log(Object.fromEntries(dataForm));
      //console.log(this.form.value);
        
      this.productoService.addItem(dataForm).subscribe(data=>{
        let info:any[]=data;
        if(info[0].status==1){
          alert(info[0].msg);
        }
      });
      
    }

  }

}
