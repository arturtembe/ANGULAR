import { Injectable } from '@angular/core';

import { Producto } from '../../interfaces/Producto';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import endpoint from '../../helpers/endpoint.helpers';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
//"multipart/form-data"
  private header_top = {
    headers: {
      //"Content-Type": undefined,
      "Accept": "*/*",
      "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
    }
  }
  private header_urlencoded= {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
    }
  }
  private header_uthorization = {
    headers:{
      "Authorization": `Bearer ${sessionStorage.getItem("tokenGTask")}`
    }
  }
  //private apiUrl_GET='http://localhost:3000/db/controllers/shoopee/productoController/getProductoAPI.php';
  //private apiUrl_POST='http://localhost:3000/db/controllers/shoopee/productoController/addProductoAPI.php';
  private apiUrl_EDIT='http://localhost:3000/db/controllers/shoopee/productoController/editProductoAPI.php';
  //private apiUrl_DELETE='http://localhost:3000/db/controllers/shoopee/productoController/deleteProductoAPI.php';
  //private apiUrl_POST='http://localhost:3000/db/controllers/teste/api.php';

  constructor(private http:HttpClient) { }

  remove(producto:any){
    return this.http.post<any>(endpoint.productoDelete,producto,this.header_urlencoded)
  }

  getAll():Observable<any>{
    
    return this.http.get<any>(endpoint.productoView,this.header_uthorization);
  }

  getItem(id:number):Observable<any>{

    return this.http.get<any>(`${endpoint.productoView}?id=${id}`);
  }

  addItem(producto:any){
      return this.http.post<any>(endpoint.productoAdd,producto,this.header_urlencoded);
  }
  addItemUpload(producto:any,id:string){
    return this.http.post<any>(`${endpoint.productoAddUpload}/${id}`,producto,this.header_top);
  }
  //EDIT
  editItem(producto:any){
    return this.http.post<Producto[]>(this.apiUrl_EDIT,producto);
  }

}
