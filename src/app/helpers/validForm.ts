import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidForm {

  constructor() { }

  textValid(value:string|null):boolean{
    return (value=="" || value==null || value==undefined);
  }

  passwordValid(value:string):boolean{
    return (value.length<8);
  }
  emailValid(value:string):boolean{
    
    let num:number[]=[];

    if(value.indexOf("@")==-1){
      num.push(0);
    }
    else if(value.split("@").length<=1 || value.split("@").length>=3){
      num.push(0);
    }
    else if(value.indexOf(".")==-1){
      num.push(1);
    }
    else if(value.split(".").length>=4){
      num.push(1);
    }
    else if(value[value.length-1]=="." || value[value.length-1]=="@"){
      num.push(2);
    }
    
    return num.length>0;
  }

}
