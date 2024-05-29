import { Component } from '@angular/core';
import { Producto } from '../../../../interfaces/Producto';
import { ProductoService } from '../../../../services/producto/producto.service';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ValidUser } from '../../../../helpers/validUser';
import { Usuario } from '../../../../interfaces/Usuario';
import { ValidSlugHelper } from '../../../../helpers/validSlug.helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  
  dashboard="1";

  urlBack:string = "";
  urlAddProduct:string = "";
  urlEditProduct:string = "";

  token:string|null=sessionStorage.getItem("tknIdshoopee");
  
  productos:Producto[]=[];
  categoria!:string;
  data:Usuario[]=[];
  slug:string|null = ``;

  constructor(private productoService:ProductoService,
    private userValid:ValidUser,
    private route:ActivatedRoute,
    private validSlugHelper:ValidSlugHelper){

    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");
    
    // LINKS
    this.urlBack = `/${this.slug}`;
    this.urlAddProduct = `/${this.slug}/product/add`;
    this.urlEditProduct = `/${this.slug}/product/edit/`

    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
    this.getProducto();
  }

  ngOnInit():void{
  
  }

  removeProducto(prod:Producto):void{
    
    let formData:any = new FormData()
    formData.append("idDado",prod._id);
    formData.append("idPreco",prod.preco._id);
    formData.append("idQntd",prod.quantidade._id);

    this.productoService.remove(new URLSearchParams(formData)).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error.error);
      }
    );
    
  }

  // API
  getProducto():void{
    //this.productoService.getAll().subscribe((productos)=>(this.productos=productos));
    this.productoService.getAll().subscribe((productos)=>{
      
      //console.log(productos);
      this.productos = productos.dados;

    },error=>{
      console.log(error.error);
    });
  }

}
