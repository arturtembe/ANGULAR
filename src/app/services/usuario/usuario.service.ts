import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/Usuario';
import endpoint from '../../helpers/endpoint.helpers';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl_TOKEN='http://localhost:3000/db/controllers/shoopee/usuarioController/getUserAPI.php';

  constructor(private http:HttpClient) { }

  loginUsuario(usuario:any):Observable<Usuario[]>{

    return this.http.post<Usuario[]>(endpoint.login,usuario)
  }

  registerUsuario(usuario:any):Observable<Usuario[]>{

    return this.http.post<Usuario[]>(endpoint.register,usuario,{
      headers:{
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*"
      }
    })
  }

  tokenUsuario(token:string|null):Observable<Usuario[]>{

    return this.http.get<Usuario[]>(`${this.apiUrl_TOKEN}?token=${token}`);
  }

}
