import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../../services/producto/producto.service';
import { Producto } from '../../../../interfaces/Producto';
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

  // Visualizador
  visualizador_img_local:boolean = false;
  url_img_local:string = ``;
  title_img_local:string = ``;

  // Update Image
  file_img_update_delete:any[] = [];
  
  constructor(private productoService:ProductoService,
    private categoriaService:CategoriaService,
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

  onChangeCloseVisualizador(){
    this.visualizador_img_local = !this.visualizador_img_local;
  }

  // End

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

  visualizarFileLocal($event:any){
    this.title_img_local = $event.name;
    this.url_img_local = URL.createObjectURL($event);
    this.visualizador_img_local = true;
  }

  visualizarFileWebOnline($event:any){
    this.title_img_local = $event.nome;
    this.url_img_local = $event.url;
    this.visualizador_img_local = true;
  }
  deleteFile_Update_Message($event:any){

    this.file_img_update_delete.push(
      $event.file
    )
    //console.log(this.allProducto.filetoupload);
    
    this.allProducto.filetoupload.splice($event.index, 1);
    
    //console.log($event.index);
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
            
            //console.log(data);
            
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
    
    // DADOS
    // Nome
    if(this.validForm.textValid(this.allProducto.nome)){
      this.messageBox = "O campo nome nao pode estar vazia!";
      this.tipoMessageBox = "error";
      return;
    }
    // Categoria
    if(this.validForm.textValid(this.allProducto.categoria)){
      this.messageBox = "O campo categoria nao pode estar vazia!";
      this.tipoMessageBox = "error";
      return;
    }

    // PRECO
    // Compra
    if(this.validForm.textValid(this.allProducto.precoCompra)){
      
      this.messageBox = "O campo preco de compra nao pode estar vazia!";
      this.tipoMessageBox = "error";
      //this.tipoMessageBox = "success";
      return;
    }
    
    if(this.validForm.numberValid(this.allProducto.precoCompra)){
      this.messageBox = "O valor no campo preco de compra deve ser maior que 0!";
      this.tipoMessageBox = "error";
      return;
    }
    // Venda
    if(this.validForm.textValid(this.allProducto.precoVenda)){
      this.messageBox = "O campo preco de venda nao pode estar vazia!";
      this.tipoMessageBox = "error";
      return;
    }
    if(this.validForm.numberValid(this.allProducto.precoVenda)){
      this.messageBox = "O valor no campo preco de venda deve ser maior que 0!";
      this.tipoMessageBox = "error";
      
      return;
    }

    // QUANTIDADE
    // Qntd
    if(this.validForm.textValid(this.allProducto.qntd)){
      this.messageBox = "O campo quantidade nao pode estar vazia!";
      this.tipoMessageBox = "error";
      return;
    }
    if(this.validForm.numberValid_Qntd(this.allProducto.qntd)){
      this.messageBox = "O valor no campo quantidade deve ser maior que 0!";
      this.tipoMessageBox = "error";
      return;
    }
    // Qntd Minima
    if(this.validForm.textValid(this.allProducto.qntdMinima)){
      this.allProducto.qntdMinima = '1';
    }
    if(this.validForm.numberValid_Qntd(this.allProducto.qntdMinima)){
      this.messageBox = "O valor no campo quantidade minima deve ser maior que 0!";
      this.tipoMessageBox = "error";
      return;
    }
    // Qntd Maxima
    if(this.validForm.textValid(this.allProducto.qntdMaxima)){
      this.allProducto.qntdMaxima = '1';
    }
    if(this.validForm.numberValid_Qntd(this.allProducto.qntdMaxima)){
      this.messageBox = "O valor no campo quantidade maxima deve ser maior que 0!";
      this.tipoMessageBox = "error";
      return;
    }
    
    // IMAGE
    
    if((
      this.allProducto.filetoupload.length + 
      this.files.length)<=0){
      this.messageBox = "Deve ter pelo menos uma image selecionada!";
      this.tipoMessageBox = "error";
      return;
    }

    this.loaderCircle = true;

    let dataForm:any = new FormData();
      dataForm.append("nome",this.allProducto.nome);
      dataForm.append("categoria",this.allProducto.categoria);
      dataForm.append("desc",this.allProducto.desc);
      // Preco
      dataForm.append("precoVenda",this.allProducto.precoVenda);
      dataForm.append("precoCompra",this.allProducto.precoCompra);
      // Qntd
      dataForm.append("qntd",this.allProducto.qntd);
      dataForm.append("qntdMinima",this.allProducto.qntdMinima);
      dataForm.append("qntdMaxima",this.allProducto.qntdMaxima);
      
      // EDIT:: DADOS; PRECO; QUANTIDADE
      this.productoService.editItem(new URLSearchParams(dataForm),this.id).subscribe(()=>{
        
        //console.log(data);
        //this.loaderCircle = false;

        let dataImage:any = new FormData();
        
        if(this.files.length>0){
          
            // IMAGE ADDICIONADA
            for(const file of this.files){
              dataImage.append("files", file, file.name);
            }

            // ADD IMAGE NOVO
            this.productoService.addItemUpload(dataImage, this.id).subscribe(image=>{
              
                // VERIFICA SE EXISTEM UMA IMAGE APAGADA
                if(this.file_img_update_delete.length>0){
                  
                  // IMAGE REMOVENDO
                  let dataImageDelete:any = new FormData();
                  for(const el of this.file_img_update_delete){
                    dataImageDelete.append("filedeleted[]",el.id);
                  }

                  // DELETE IMAGE
                  this.productoService.deleteItemUpload(new URLSearchParams(dataImageDelete)).subscribe(imageDelete=>{

                        //console.log(imageDelete);
                        
                        this.messageBox = `O producto actualizado com sucesso`;
                        this.tipoMessageBox = "success";
                        this.loaderCircle = false;

                      },
                    error=>{
                        this.messageBox = "Houve um erro interno!";
                        this.tipoMessageBox = "error";
                        console.log(error.error);
                        this.loaderCircle = false;
                    });

                }
                else{
                    //console.log(image);
                    this.messageBox = `O producto actualizado com sucesso`;
                    this.tipoMessageBox = "success";
                    this.loaderCircle = false;
                }

              },error=>{
                this.messageBox = `${error.error.message}`;
                this.tipoMessageBox = "error";
                console.log(error.error);
                this.loaderCircle = false;
            });
            
            //return;
        }
        else if(this.file_img_update_delete.length>0){
          
          // IMAGE REMOVENDO
          let dataImageDelete:any = new FormData();
          for(const el of this.file_img_update_delete){
            dataImageDelete.append("filedeleted[]",el.id);
          }

          // DELETE IMAGE
          this.productoService.deleteItemUpload(new URLSearchParams(dataImageDelete)).subscribe(()=>{

                //console.log(imageDelete);
                
                this.messageBox = `O producto actualizado com sucesso`;
                this.tipoMessageBox = "success";
                this.loaderCircle = false;

              },
            error=>{
                this.messageBox = "Houve um erro interno!";
                this.tipoMessageBox = "error";
                console.log(error.error);
                this.loaderCircle = false;
            });

        }
        else{
          // Message :: Se nao existir uma image selecionada
          this.messageBox = `O producto actualizado com sucesso`;
          this.tipoMessageBox = "success";
          this.loaderCircle = false;
        }

      }, error=>{
        //his.messageBox = `${error.error.message}`;
        this.messageBox = "Houve um erro interno!";
        this.tipoMessageBox = "error";
        console.log(error.error.error.message);
        this.loaderCircle = false;
      });

  }

}
