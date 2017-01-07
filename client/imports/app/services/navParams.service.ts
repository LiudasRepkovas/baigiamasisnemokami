import {Injectable} from '@angular/core';

@Injectable()
export class NavParams {
  data: any;

  constructor(){}

  public setData(data: any){
    this.data = data;
  }

  public getData(data: string){
    return this.data ? this.data[data] : null;
  }
}
