import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../../interfaces/Usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ValidForm } from '../../helpers/validForm';
import { ValidUser } from '../../helpers/validUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form!:FormGroup;

  usuario:Usuario[]=[];

  constructor(private usuarioService:UsuarioService,
            private _formBuilder:FormBuilder,
            private valid:ValidForm,
            private userValid:ValidUser){
              this.userValid.validOnOFF()&&(this.userValid.userValid_Login());
  }

  ngOnInit():void{
    this.form=this._formBuilder.group({
      email:[""],
      password:[""],
      checkbox:[false]
    })
  }

  login():void{
    
    if(this.valid.textValid(this.form.value.email) && this.valid.emailValid(this.form.value.email)){
      alert("O campo Email e obrigatorio!");
      return;
    }
    else if(this.valid.emailValid(this.form.value.email)){
      alert("Email Invalido!");
      return;
    }
    else if(this.valid.textValid(this.form.value.password)){
      alert("O campo Senha e obrigatorio!");
      return;
    }
    else if(this.valid.passwordValid(this.form.value.password)){
      alert("Senha deve ter no minimo 8 digitos!");
      return;
    }
    
    let dataForm:any = new FormData();
      dataForm.append("email",this.form.value.email);
      dataForm.append("password",this.form.value.password);
      dataForm.append("href", `${location.protocol}//${location.host}`);

      this.usuarioService.loginUsuario(new URLSearchParams(dataForm)).subscribe(data=>{
        
        let dado:any = data;
        //console.log(dado.profile.user.slug);
        sessionStorage.setItem("tokenGTask", dado.token);
        location.href = `/${dado.profile.user.slug}`;
        //sessionStorage.setItem("tknIdshoopee",data);
        
      }, async(error)=>{
        
        if(error.error.status==400){
          //console.log(error.error);
          
          this.usuarioService.otpCreateUsuario(new URLSearchParams(dataForm)).subscribe(otp=>{
            
            //console.log(otp);
            
            location.href = otp.href;
            
          },(err)=>{
            console.log(err);
          });

          //alert(error.error.message);
          //alert(error.error.eml);
          
        }
        else{
          alert(error.error.message);
        }
        //console.log(error);
      });
  
  }

}
