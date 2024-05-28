import { Component } from '@angular/core';
import { ProductoService } from '../../../../services/producto/producto.service';
import { Producto } from '../../../../interfaces/Producto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../../interfaces/Categoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { ValidUser } from '../../../../helpers/validUser';
import { ValidSlugHelper } from '../../../../helpers/validSlug.helpers';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  
  dashboard="1";
  urlBack="/dashboard/product";
  
  form!:FormGroup;

  producto:Producto[]=[];
  nome!:string;
  precoVenda!:number;
  categoria!:number;
  desc!:string;
  categorias:Categoria[]=[];
  id!:number;
  slug:string|null = ``;

  constructor(private productoService:ProductoService,
    private categoriaService:CategoriaService,
              private _formBuilder:FormBuilder,
              private route:ActivatedRoute,
              private userValid:ValidUser,
              private validSlugHelper:ValidSlugHelper){

    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");
                            
    // LINKS
    this.urlBack = `/${this.slug}/product`;
                    
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
    this.getProducto();
              
  }

  ngOnInit():void{

    this.form=this._formBuilder.group({
      nome:[this.nome||""],
      precoVenda:[this.precoVenda||0],
      categoria:[this.categoria||0],
      filetoupload:[],
      desc:[this.desc||""]
    })
    
  }

  getProducto():void{
    
    this.id=Number(this.route.snapshot.paramMap.get("id"));
    this.productoService.getItem(this.id).subscribe((productos)=>{
      this.nome=productos[0].nome;
      this.precoVenda=productos[0].precoVenda;
      this.categoria=productos[0].idCat;
      this.desc=productos[0].descricao;

      this.form=this._formBuilder.group({
        nome:[this.nome],
        precoVenda:[this.precoVenda],
        categoria:[this.categoria],
        filetoupload:[],
        desc:[this.desc]
      })
  });

    this.categoriaService.getAll().subscribe((categorias)=>(this.categorias=categorias));
  }

  ediProducto():void{
    
    if(this.form.value.nome!="" && this.form.value.precoVenda>0
      && this.form.value.categoria>0){

      let dataForm:any=new FormData();
      dataForm.append("nome",this.form.value.nome);
      dataForm.append("precoVenda",this.form.value.precoVenda);
      dataForm.append("categoria",this.form.value.categoria);

      if(this.form.value.filetoupload!=null){
        let dd:any=document.getElementById("filetoupload");
        dataForm.append("filetoupload",dd.files[0]);
      }
      dataForm.append("desc",this.form.value.desc);
      dataForm.append("idUser",`${1}`);
      dataForm.append("id",`${this.id}`);
      
      //console.log(Object.fromEntries(dataForm));
      //console.log(this.form.value);
        
      this.productoService.editItem(dataForm).subscribe(data=>{
        let info:any[]=data;
        if(info[0].status==1){
          alert(info[0].msg);
        }
      });
      
    }else{
      console.log(this.form.value);
      
      //alert("O campo nome, precoVenda e categoria sao obrigatorio!")
    }

  }

  getSelectedCategoria(idcat_form:number,idcat:number):boolean{
    
    let data:boolean=(idcat_form===idcat)?true:false;

    //console.log(idcat_form+" - "+idcat+" = "+data);
    
    return data;
  }

}
