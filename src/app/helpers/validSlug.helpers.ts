import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class ValidSlugHelper {

    constructor(private usuarioService:UsuarioService) { 
    }

    // USER
    verifySlug(route:ActivatedRoute){
        if(route.snapshot.paramMap.get("slug")=="" || 
        route.snapshot.paramMap.get("slug")==null || 
        typeof route.snapshot.paramMap.get("slug")==undefined){
        
            location.href = '/login';
    
            return;
        }

        this.getVerifyUser(route.snapshot.paramMap.get("slug"))
    
    }

    getVerifyUser(slug:any){
        this.usuarioService.verifySlug(slug).subscribe(data=>{
            //console.log(data);
        },error=>{
            if(error.error.status==400){
                alert(error.error.message);
                sessionStorage.removeItem("tokenGTask");
                location.href = '/login';

                return;
            }
            if(error.error.status==404){
                alert(error.error.message);
                sessionStorage.removeItem("tokenGTask");
                location.href = '/login';

                return;
            }

            alert(error.error.message);
            //console.log(error.error);
            //location.href = '/notfound';
            //location.href = '/notfound';
        })
    }

    // ID: EDIT
    verifySlug_ID_EDIT(route:ActivatedRoute,path:string){
        if(route.snapshot.paramMap.get("id")=="" || 
        route.snapshot.paramMap.get("id")==null || 
        typeof route.snapshot.paramMap.get("id")==undefined){
        
            location.href = path;
    
            return;
        }

    }

}
