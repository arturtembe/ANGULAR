import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../interfaces/Categoria';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService{

  private apiUrl_GET='http://localhost:3000/db/controllers/shoopee/categoriaController/getCategoriaAPI.php';
  private apiUrl_POST='http://localhost:3000/db/controllers/shoopee/categoriaController/addCategoriaAPI.php';
  private apiUrl_EDIT='http://localhost:3000/db/controllers/shoopee/categoriaController/editCategoriaAPI.php';
  private apiUrl_DELETE='http://localhost:3000/db/controllers/shoopee/categoriaController/deleteCategoriaAPI.php';

  constructor(private http:HttpClient) { }

  remove(categoria:any){
    return this.http.post<Categoria[]>(this.apiUrl_DELETE,categoria)
  }

  getAll():Observable<Categoria[]>{
    
    return this.http.get<Categoria[]>(this.apiUrl_GET);
  }

  getItem(id:number):Observable<Categoria[]>{

    return this.http.get<Categoria[]>(`${this.apiUrl_GET}?id=${id}`);
  }

  addItem(categoria:any){
      return this.http.post<Categoria[]>(this.apiUrl_POST,categoria);
  }
  //EDIT
  editItem(categoria:any){
    return this.http.post<Categoria[]>(this.apiUrl_EDIT,categoria);
  }

}
