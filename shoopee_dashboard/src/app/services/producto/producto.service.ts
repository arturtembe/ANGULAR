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

  constructor(private http:HttpClient) { }

  remove(producto:any){
    return this.http.post<any>(endpoint.productoDelete,producto,this.header_urlencoded)
  }

  getAll():Observable<any>{
    
    return this.http.get<any>(endpoint.productoView,this.header_uthorization);
  }

  getItem(id:any):Observable<any>{

    return this.http.get<any>(`${endpoint.productoView}/${id}`,this.header_uthorization);
  }

  addItem(producto:any){
      return this.http.post<any>(endpoint.productoAdd,producto,this.header_urlencoded);
  }
  //EDIT
  editItem(producto:any,id:any){
    return this.http.post<any>(`${endpoint.productoEdit}/${id}`,producto, this.header_urlencoded);
  }

  // Upload
  addItemUpload(producto:any,id:any){
    return this.http.post<any>(`${endpoint.productoAddUpload}/${id}`,producto,this.header_top);
  }
  deleteItemUpload(producto:any){
    return this.http.post<any>(endpoint.productoDeleteUpload,producto,this.header_urlencoded);
  }

}
