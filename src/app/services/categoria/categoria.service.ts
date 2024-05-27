import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../interfaces/Categoria';

import { Observable } from 'rxjs';
import endpoint from '../../helpers/endpoint.helpers';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService{

  headersTop = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "*/*",
    "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
  }

  constructor(private http:HttpClient) { }

  // ADD
  addItem(categoria:any){
    return this.http.post<any>(endpoint.categoriaAdd,categoria,{
      headers:this.headersTop
    });
  }

  // GET
  getAll():Observable<any>{
    
    return this.http.get<any>(endpoint.categoriaView,{
      headers:{
        "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
      }
    });
  }

  getItem(id:any):Observable<any>{

    return this.http.get<any>(`${endpoint.categoriaView}/${id}`,{
      headers:{
        "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
      }
    });
  }

  //EDIT
  editItem(categoria:any,id:any){
    return this.http.post<any>(`${endpoint.categoriaEdit}/${id}`,categoria,{
      headers: this.headersTop
    });
  }

  remove(id:any){
    return this.http.get<any>(`${endpoint.categoriaDelete}/${id}`,{
      headers:{
        "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
      }
    })
  }

}
