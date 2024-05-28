import { Component } from '@angular/core';
import { Producto } from '../../../../interfaces/Producto';
import { ProductoService } from '../../../../services/producto/producto.service';
import { CategoriaService } from '../../../../services/categoria/categoria.service';
import { ValidUser } from '../../../../helpers/validUser';
import { Usuario } from '../../../../interfaces/Usuario';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { ValidSlugHelper } from '../../../../helpers/validSlug.helpers';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  
  dashboard="1";

  urlBack="";
  urlAddProduct="";

  token:string|null=sessionStorage.getItem("tknIdshoopee");
  
  productos:Producto[]=[];
  categoria!:string;
  data:Usuario[]=[];
  slug:string|null = ``;

  constructor(private productoService:ProductoService,
    private categoriaService:CategoriaService,
    private userValid:ValidUser,
    private route:ActivatedRoute,
    private validSlugHelper:ValidSlugHelper){

    this.validSlugHelper.verifySlug(route);
    this.slug = this.route.snapshot.paramMap.get("slug");
    
    // LINKS
    this.urlBack = `/${this.slug}`;
    this.urlAddProduct = `/${this.slug}/product/add`;

    this.userValid.validOnOFF()?(this.userValid.userValid()):(location.href="/login");
    this.getProducto();
  }

  ngOnInit():void{
  
  }

  removeProducto(producto:Producto):void{
    this.productos =this.productos.filter((a)=>producto.id!==a.id);
    let dataForm=new FormData();
    dataForm.append("id",`${producto.id}`);
    this.productoService.remove(dataForm).subscribe(
      data=>{
        let info:any[]=data;
        if(info[0].status==1){
          //alert(info[0].msg);
        }
      }
    );
  }

  // API
  getProducto():void{
    this.productoService.getAll().subscribe((productos)=>(this.productos=productos));
  }

  getCategoria(id:number){
    this.categoriaService.getItem(id).subscribe((categorias)=>(this.categoria=categorias[0].categoria));

    return this.categoria;
  }

}
