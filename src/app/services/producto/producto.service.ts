import { Injectable } from '@angular/core';

import { Producto } from '../../interfaces/Producto';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl_GET='http://localhost:3000/db/controllers/shoopee/productoController/getProductoAPI.php';
  private apiUrl_POST='http://localhost:3000/db/controllers/shoopee/productoController/addProductoAPI.php';
  private apiUrl_EDIT='http://localhost:3000/db/controllers/shoopee/productoController/editProductoAPI.php';
  private apiUrl_DELETE='http://localhost:3000/db/controllers/shoopee/productoController/deleteProductoAPI.php';
  //private apiUrl_POST='http://localhost:3000/db/controllers/teste/api.php';

  constructor(private http:HttpClient) { }

  remove(producto:any){
    return this.http.post<Producto[]>(this.apiUrl_DELETE,producto)
  }

  getAll():Observable<Producto[]>{
    
    return this.http.get<Producto[]>(this.apiUrl_GET);
  }

  getItem(id:number):Observable<Producto[]>{

    return this.http.get<Producto[]>(`${this.apiUrl_GET}?id=${id}`);
  }

  addItem(producto:any){
      return this.http.post<Producto[]>(this.apiUrl_POST,producto);
  }
  //EDIT
  editItem(producto:any){
    return this.http.post<Producto[]>(this.apiUrl_EDIT,producto);
  }

}
