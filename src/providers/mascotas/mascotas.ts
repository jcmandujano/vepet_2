import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class MascotasProvider {

  data : Observable<any>;
  constructor(public http: HttpClient) {
    //console.log('Hello MascotasProvider Provider');
  }

  getMascotas(_userid:string, _mascotaid:string){
    let parameters = new HttpParams();
    parameters = parameters.append('usuarioid',_userid); 
    parameters = parameters.append('mascotaid',_mascotaid); 
    //console.log(email);
    //console.log(password);
   // return this.http.get('http://loop-studio.com.mx/api2/mascotasService.php',{params: parameters});
    return new Promise(resolve => {
      this.http.get('http://loop-studio.com.mx/api2/mascotasService.php',{params: parameters}).toPromise().then(data => {
        resolve(data);
      }, err => {
        console.log("error",err);
      });
    });
  }

  postMascota(_userid:string, _nombre:string, _tipo:string, _raza:string, _genero:string, _edad:string, _talla:string , _estatus:string){
    
    var url = 'http://loop-studio.com.mx/api2/mascotasService.php';
    let postData = new FormData();
    postData.append('usuarioid', _userid);
    postData.append('nombre', _nombre);
    postData.append('tipo', _tipo);
    postData.append('raza', _raza);
    postData.append('genero', _genero);
    postData.append('edad', _edad);
    postData.append('talla', _talla);
    postData.append('estatus', _estatus);
    //postData.append('foto', _password);

    return this.data = this.http.post(url, postData, {responseType: 'text'});

  }
}
