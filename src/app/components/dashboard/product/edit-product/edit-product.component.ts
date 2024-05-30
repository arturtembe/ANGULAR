import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto/producto.service';
import { Producto } from '../../../../interfaces/Producto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categoria } from '../../../../interfaces/Categoria';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ValidUser } from '../../../../helpers/validUser';
import { ValidSlugHelper } from '../../../../helpers/validSlug.helpers';
import { ActivatedRoute } from '@angular/router';
import { ValidForm } from '../../../../helpers/validForm';
import { ValidIDHelper } from '../../../../helpers/validID.helpers';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{
  
  dashboard="1";
  urlBack="";

  form!:FormGroup;

  // Tab Header
  onOffTabeHeader:any = {};

  producto:Producto[]=[];
  allProducto!:any;
  categorias:Categoria[]=[];

  slug:string|null = ``;
  id:string|null = ``;

  files: any[] = [];

  // Message Box
  tipoMessageBox:string = '';
  messageBox:string = '';

  // Loader
  loaderCircle:boolean = false;
  loaderButton:boolean = false;

  constructor(private productoService:ProductoService,
    private categoriaService:CategoriaService,
              private _formBuilder:FormBuilder,
              private userValid:ValidUser,
              private validForm:ValidForm,
              private route:ActivatedRoute,
              private validSlugHelper:ValidSlugHelper,
              private validIDHelper: ValidIDHelper){

    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");
    
    this.validIDHelper.verifyIDProduct(route);
    this.id = route.snapshot.paramMap.get("id");
    
    // LINKS
    this.urlBack = `/${this.slug}/product`;
                            
    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
                
    // VARIALVEL
    this.onOffTabeHeader = {
      tab01:true,
      tab02:false,
      tab03:false,
      tab04:false,
    };

    this.allProducto = {
      nome:"",
      categoria:"",
      desc:"",
      // Preco
      precoCompra: "",
      precoVenda: "",
      // Quantidade
      qntd: "",
      qntdMinima: "",
      qntdMaxima: "",
      // IMAGE
      filetoupload: []
    };

  }


  ngOnInit():void{

    // GETS
    this.getCategoria();
    this.getProductID();
    
    this.form = this._formBuilder.group({
      nome:[""],
      categoria:[""],
      desc:[""],
      // Preco
      precoCompra:[""],
      precoVenda:[""],
      // Quantidade
      qntd:[""],
      qntdMinima:[""],
      qntdMaxima:[""],
      // IMAGE
      filetoupload:[],
    });
    
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

  onChangeCloseBoxMessage(){
    this.messageBox = '';
    this.tipoMessageBox = '';
  }

  // End

  validFields(){

    // DADOS
    // Nome
    if(this.validForm.textValid(this.form.value.nome)){
      this.messageBox = "O campo nome nao pode estar vazia!";
      this.tipoMessageBox = "error";
      return;
    }
    // Categoria
    if(this.validForm.textValid(this.form.value.categoria)){
      this.messageBox = "O campo categoria nao pode estar vazia!";
      this.tipoMessageBox = "error";
      return;
    }

    // PRECO
    // Compra
    if(this.validForm.textValid(this.form.value.precoCompra)){
      
      this.messageBox = "O campo preco de compra nao pode estar vazia!";
      this.tipoMessageBox = "error";
      //this.tipoMessageBox = "success";
      return;
    }
    
    if(this.validForm.numberValid(this.form.value.precoCompra)){
      this.messageBox = "O valor no campo preco de compra deve ser maior que 0!";
      this.tipoMessageBox = "error";
      return;
    }
    // Venda
    if(this.validForm.textValid(this.form.value.precoVenda)){
      this.messageBox = "O campo preco de venda nao pode estar vazia!";
      this.tipoMessageBox = "error";
      return;
    }
    if(this.validForm.numberValid(this.form.value.precoVenda)){
      this.messageBox = "O valor no campo preco de venda deve ser maior que 0!";
      this.tipoMessageBox = "error";
      
      return;
    }

    // QUANTIDADE
    // Qntd
    if(this.validForm.textValid(this.form.value.qntd)){
      this.messageBox = "O campo quantidade nao pode estar vazia!";
      this.tipoMessageBox = "error";
      return;
    }
    if(this.validForm.numberValid_Qntd(this.form.value.qntd)){
      this.messageBox = "O valor no campo quantidade deve ser maior que 0!";
      this.tipoMessageBox = "error";
      return;
    }
    // Qntd Minima
    if(this.validForm.textValid(this.form.value.qntdMinima)){
      this.form.value.qntdMinima = '1';
    }
    if(this.validForm.numberValid_Qntd(this.form.value.qntdMinima)){
      this.messageBox = "O valor no campo quantidade minima deve ser maior que 0!";
      this.tipoMessageBox = "error";
      return;
    }
    // Qntd Maxima
    if(this.validForm.textValid(this.form.value.qntdMaxima)){
      this.form.value.qntdMaxima = '1';
    }
    if(this.validForm.numberValid_Qntd(this.form.value.qntdMaxima)){
      this.messageBox = "O valor no campo quantidade maxima deve ser maior que 0!";
      this.tipoMessageBox = "error";
      return;
    }
    
    // IMAGE
    if(this.files.length<=0){
      this.messageBox = "Deve ter pelo menos uma image selecionada!";
      this.tipoMessageBox = "error";
      return;
    }

  }

  addFileMessage($event:any){
    //console.log($event);
    this.files.push($event);
  }
  deleteFileMessage($event:number){
    //console.log($event);
    this.files.splice($event, 1);
  }

  messageFileMessage($event:string){
    //console.log($event);
    this.messageBox = $event;
    this.tipoMessageBox = 'error';
  }

  progressFileMessage($event:boolean){
    //console.log($event);
    this.loaderButton = $event;
  }

  // GET PRODUCT
  getCategoria():void{
    this.categoriaService.getAll().subscribe((data)=>{
      
      this.categorias = data.categorias;
      //console.log(data);

    },error=>{
      console.log(error.error);
    });
  }
  getProductID(){
    
    this.productoService.getItem(this.id).subscribe(
        data=>{
            console.log(data);
            
            this.allProducto = {
              nome: data.dados.nome,
              categoria: data.dados.categoria,
              desc: data.dados.desc,
              // Preco
              precoCompra: data.dados.preco.precoCompra,
              precoVenda: data.dados.preco.precoVenda,
              // Quantidade
              qntd: data.dados.quantidade.qntd,
              qntdMinima: data.dados.quantidade.qntdMinima,
              qntdMaxima: data.dados.quantidade.qntdMaxima,
              // IMAGE
              filetoupload: data.images
            };
            
        },
        error=>{
          this.messageBox = "Houve um erro interno! Porfavor actualize a pagina";
          this.tipoMessageBox = "error";
          //location.href =  `/${this.slug}/product`;
          console.log(error.error);
        }
    );

  }

  editProducto():void{
    
    this.validFields();

    this.loaderCircle = true;

    let dataForm:any = new FormData();
      dataForm.append("nome",this.form.value.nome);
      dataForm.append("categoria",this.form.value.categoria);
      dataForm.append("desc",this.form.value.desc);
      // Preco
      dataForm.append("precoVenda",this.form.value.precoVenda);
      dataForm.append("precoCompra",this.form.value.precoCompra);
      // Qntd
      dataForm.append("qntd",this.form.value.qntd);
      dataForm.append("qntdMinima",this.form.value.qntdMinima);
      dataForm.append("qntdMaxima",this.form.value.qntdMaxima);
      
      
      this.productoService.addItem(new URLSearchParams(dataForm)).subscribe(data=>{
        
        //console.log(data);

        let dataImage:any = new FormData();
        //dataImage.append("id", data.producto.id);
        //alert(data.producto[0]._id);
        
        // IMAGE
        for(const file of this.files){
          
          dataImage.append("files", file, file.name);

        }

        this.productoService.addItemUpload(dataImage, data.producto[0]._id).subscribe(image=>{

          //console.log(image);
          this.loaderCircle = false;
          //location.href = `/${this.slug}/product`;
          this.messageBox = `O producto registado com sucesso`;
          this.tipoMessageBox = "success";

        },error=>{
          this.messageBox = `${error.error.message}`;
          this.tipoMessageBox = "error";
          console.log(error.error);
          this.loaderCircle = false;
        });
        
      }, error=>{
        this.messageBox = `${error.error.message}`;
        //this.messageBox = "Houve um erro interno!";
        this.tipoMessageBox = "error";
        console.log(error.error);
        this.loaderCircle = false;
      });

  }

}
