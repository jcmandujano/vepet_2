import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient,
              private storage : Storage) {
    //console.log('Hello StorageProvider Provider');
  }

  public async getData(){
    return await this.storage.get('userdata');
  }

  public async getValues(){
    this.storage.get('userdata').then((val) => {
      return val.id_usuario;

      //console.log('Constructor info', val.id_usuario);
    });
  }

}
