import { Categoria } from "./Categoria";
import { ProductoImage } from "./ProductoImage";
import { ProductoPreco } from "./ProductoPreco";
import { Usuario } from "./Usuario.interfaces";

export interface ProductoQntd{
    _id:string;
    qntd:number;
    qntdMinima:number;
    qntdMaxima:number;
    dataRgt:string;
    dataUpdt:string;
}