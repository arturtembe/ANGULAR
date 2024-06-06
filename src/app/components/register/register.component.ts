import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../../interfaces/Usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ValidForm } from '../../helpers/validForm';
import { ValidUser } from '../../helpers/validUser';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  form!:FormGroup;

  usuario:Usuario[]=[];

  constructor(private usuarioService:UsuarioService,
            private _formBuilder:FormBuilder,
            private valid:ValidForm,
            private userValid:ValidUser,
            private titleService: Title){
              this.userValid.validOnOFF()&&(this.userValid.userValid_Login());
  }

  ngOnInit():void{
    
    // Title
    this.titleService.setTitle("Register");

    this.form=this._formBuilder.group({
      username:[""],
      email:[""],
      password:[""],
      checkbox:[false]
    })
  }

  register():void{
    
    if(this.valid.textValid(this.form.value.username)){
      alert("O campo Username e obrigatorio!");
      return;
    }
    if(this.valid.textValid(this.form.value.email) && this.valid.emailValid(this.form.value.email)){
      alert("O campo Email e obrigatorio!");
      return;
    }
    if(this.valid.emailValid(this.form.value.email)){
      alert("Email Invalido!");
      return;
    }
    if(this.valid.textValid(this.form.value.password)){
      alert("O campo Senha e obrigatorio!");
      return;
    }
    if(this.valid.passwordValid(this.form.value.password)){
      alert("Senha deve ter no minimo 8 digitos!");
      return;
    }
    if(!this.form.value.checkbox){
      alert("Porfavor selecione os termo e condicoes!");
      return;
    }
    
    // Aqui vem o codigo
    let dataForm:any=new FormData();
      dataForm.append("username",this.form.value.username);
      dataForm.append("email",this.form.value.email);
      dataForm.append("password",this.form.value.password);
      dataForm.append("href", `${location.protocol}//${location.host}`);

      this.usuarioService.registerUsuario(new URLSearchParams(dataForm)).subscribe(data=>{
        
        //alert("Registado com sucesso!")
        
        this.usuarioService.otpCreateUsuario(new URLSearchParams(dataForm)).subscribe(otp=>{
            
          //console.log(otp);
          
          location.href = otp.href;
          
        },(err)=>{
          console.log(err);
        });

      },(error)=>{
        alert(error.error.message);
      });
  
  }

}
