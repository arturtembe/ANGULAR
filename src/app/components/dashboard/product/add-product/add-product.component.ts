import { Component } from '@angular/core';
import { ProductoService } from '../../../../services/producto/producto.service';
import { Producto } from '../../../../interfaces/Producto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../../interfaces/Categoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ValidUser } from '../../../../helpers/validUser';
import { ValidSlugHelper } from '../../../../helpers/validSlug.helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  dashboard="1";
  urlBack="";

  form!:FormGroup;

  // Tab Header
  onOffTabeHeader:any = {};

  producto:Producto[]=[];
  categorias:Categoria[]=[];
  slug:string|null = ``;

  constructor(private productoService:ProductoService,
    private categoriaService:CategoriaService,
              private _formBuilder:FormBuilder,
              private userValid:ValidUser,
              private route:ActivatedRoute,
              private validSlugHelper:ValidSlugHelper){

    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");
                
    // LINKS
    this.urlBack = `/${this.slug}/product`;
                
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
    this.getCategoria();

    // VARIALVEL
    this.onOffTabeHeader = {
      tab01:true,
      tab02:false,
      tab03:false,
      tab04:false,
    };

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

  // Star EVENT TAB

  onBtnTabHeader(id:number){
    switch (id) {
      case 1:
        this.onOffTabeHeader = {
          tab01: true,
          tab02: false,
          tab03: false,
          tab04: false,
        };
        break;
      case 2:
        this.onOffTabeHeader = {
          tab01: false,
          tab02: true,
          tab03: false,
          tab04: false
        };
        break;
        case 3:
          this.onOffTabeHeader = {
            tab01: false,
            tab02: false,
            tab03: true,
            tab04: false
          };
          break;
          case 4:
            this.onOffTabeHeader = {
              tab01: false,
              tab02: false,
              tab03: false,
              tab04: true
            };
            break;
    
      default:
        break;
    }
  }

  // End

  getCategoria():void{
    this.categoriaService.getAll().subscribe((data)=>{
      
      this.categorias = data.categorias;
      //console.log(data);

    },error=>{
      console.log(error.error);
    });
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
