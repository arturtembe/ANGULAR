import { Categoria } from "./Categoria";
import { ProductoImage } from "./ProductoImage";
import { ProductoPreco } from "./ProductoPreco";
import { ProductoQntd } from "./ProductoQntd.interfaces";
import { Usuario } from "./Usuario.interfaces";

export interface Producto{
    _id: string,
    nome: string;
    desc: string;
    preco: ProductoPreco;
    quantidade: ProductoQntd;
    idCat:number;
    categoria: Categoria,
    imageName:string;
    images: ProductoImage;
    user: Usuario,
    dataRgt: string;
    dataUpdt: string;

    status:number;
    msg:string;
}