import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidForm {

  constructor() { }

  textValid(value:string|null):boolean{
    return (value=="" || value==null || typeof value==undefined);
  }

  numberValid(value:string|null):boolean{
    let data:boolean = true;
    
    if(!this.textValid(value)){
      let num:number = parseFloat(`${value}`);
      if(!isNaN(num)){
        if(num>0){
          data = false;
        }
      }
    }

    return data;
  }

  numberValid_Qntd(value:string|null):boolean{
    let data:boolean =false;
    
    if(!this.textValid(value)){
      let num:number = parseInt(`${value}`);
      if(!isNaN(num)){
        if(num>0){
          data = true;
        }
      }
    }

    return data;
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
