import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../services/producto/producto.service';
import { Producto } from '../interfaces/Producto';

@Injectable({
    providedIn: 'root'
})
export class ValidIDHelper {

    constructor(private productService:ProductoService) { 
    }

    // USER
    verifyIDProduct(route:ActivatedRoute){
        if(route.snapshot.paramMap.get("id")=="" || 
        route.snapshot.paramMap.get("id")==null || 
        typeof route.snapshot.paramMap.get("id")==undefined){
        
            location.href = `/${route.snapshot.paramMap.get("slug")}/product`;
    
            return;
        }
    
    }

}
