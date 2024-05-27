import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/Usuario';
import endpoint from '../../helpers/endpoint.helpers';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //private apiUrl_TOKEN='http://localhost:3000/db/controllers/shoopee/usuarioController/getUserAPI.php';

  constructor(private http:HttpClient) { }

  loginUsuario(usuario:any):Observable<Usuario[]>{

    return this.http.post<Usuario[]>(endpoint.login,usuario,{
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*"
      }
    });
  }

  registerUsuario(usuario:any):Observable<any>{

    return this.http.post<any>(endpoint.register,usuario,{
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*"
      }
    })
  }

  otpCreateUsuario(usuario:any):Observable<any>{

    return this.http.post<any>(endpoint.otpCreate,usuario,{
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*"
      }
    })
  }

  otpVerifyUsuario(usuario:any):Observable<any>{

    return this.http.post<any>(endpoint.otpVerify,usuario,{
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*"
      }
    })
  }

  verifyUsuario(slug:any):Observable<any>{
    return this.http.get<any>(`${endpoint.verify}/${slug}`,{
      headers: { "Content-Type": "application/json" },
    });
  }

  verifySlug(slug:any):Observable<any>{
    return this.http.get<any>(`${endpoint.userSlugVerify}/${slug}`,{
      headers: { 
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
      },
    });
  }

  tokenUsuario(token:string|null):Observable<any>{

    return this.http.get<any>(endpoint.verifyToken,{
      headers:{
        "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
      }
    });
  }

}
