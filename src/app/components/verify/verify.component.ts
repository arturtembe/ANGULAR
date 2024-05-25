import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {

  canShowMessageError:boolean=false;
  messageError_Title:string = 'Title';
  messageError_Text:string = 'Some text in the Modal..';

  otp?:string|null;
  slug?:string|null;

  constructor(private route:ActivatedRoute,
    private usuarioService:UsuarioService){
    this.verifySLUG();
  }


  verifySLUG(){

    if(this.route.snapshot.paramMap.get("slug")!="" || 
    this.route.snapshot.paramMap.get("slug")!=null || 
    typeof this.route.snapshot.paramMap.get("slug")!=undefined){
      
      this.slug = this.route.snapshot.paramMap.get("slug");

      this.getViewUsuario();
      
      return;
    }

    location.href = '/login';
    
  }

  onChangeMessageSuccessError(){
    //alert(Math.floor(Math.random()*10))
    location.href = '/login';
  }

  getViewUsuario(){
    
    this.usuarioService.verifyUsuario(this.slug).subscribe(data=>{
        
      //console.log(data);
      if(data.user.status){
        location.href = `/${data.user.slug}`;
        return;
      }
      if(data.otp){
        this.messageError_Title = `Info!`; 
        this.messageError_Text = data.message;

        this.verifyOTP();
        
        return;
      }

      this.messageError_Title = `Info!`; 
      this.messageError_Text = data.message; 
      this.canShowMessageError = true;
      
    },(error)=>{
      this.messageError_Title = `ERRO ${error.error.status}`; 
      this.messageError_Text = error.error.message; 
      this.canShowMessageError = true;
    });
  }

  verifyOTP(){

    if(this.route.snapshot.paramMap.get("otp")!="" || 
    this.route.snapshot.paramMap.get("otp")!=null || 
    typeof this.route.snapshot.paramMap.get("otp")!=undefined){
      this.otp = this.route.snapshot.paramMap.get("otp");
      
      this.usuarioService.verifyUsuario(this.slug).subscribe(data=>{
        //console.log(data.user);

        let dataForm:any = new FormData();
        dataForm.append("email", data.user.email);
        dataForm.append("otp", `${this.otp}`);

        this.usuarioService.otpVerifyUsuario(new URLSearchParams(dataForm)).subscribe(verifyOtp=>{
          //console.log(verifyOtp);
          let dado:any = data;
          
          sessionStorage.setItem("tokenGTask", dado.token);
          location.href = `/${dado.profile.user.slug}`;
        
        },(error=>{
          console.log(error.error);
        }));

      },error=>{
        console.log(error.error);
      });
    }

  }

}
