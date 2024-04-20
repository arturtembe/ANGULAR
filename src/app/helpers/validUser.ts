import { Injectable } from '@angular/core';
import { ValidForm } from './validForm';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ValidUser {

  private token:string|null=sessionStorage.getItem("tknIdshoopee");

  idUser:string="";
  data:Usuario[]=[];

  constructor(private valid:ValidForm,
    private usuarioService:UsuarioService
  ) { }

  userValid(){
    
      this.usuarioService.tokenUsuario(this.token).subscribe(data=>{
          if(data[0].status<1){
            this.restartSession();        
          }
      });
      
  }

  userValid_Login(){
    
    this.usuarioService.tokenUsuario(this.token).subscribe(data=>{
        if(data[0].status==1){
          this.startSession();        
        }
    });
    
}

  startSession(){
    location.href="/dashboard";
  }
  restartSession(){
    sessionStorage.setItem("tknIdshoopee","");
    location.href="/login";
  }

  validOnOFF():boolean{
    return !this.valid.textValid(this.token);
  }

}
