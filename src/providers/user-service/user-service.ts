import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from "md5-typescript";
import { Observable } from '../../../node_modules/rxjs/Observable';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  data : Observable<any>;
  constructor(public http: HttpClient) {
    console.log('Hello UserServiceProvider Provider');
  }

  //JCMV metodo en el provider para hacer la peticion de login
  doLogin() {
    let parameters = new HttpParams();
    //parameters = parameters.append('email',email);
    //parameters = parameters.append('password',Md5.init(password)); 
    parameters = parameters.append('email','carlosmandujano.v@gmail.com');
    parameters = parameters.append('password',Md5.init('pass')); 
    return new Promise(resolve => {
      this.http.get('http://loop-studio.com.mx/api2/loginSigninService.php',{params: parameters}).toPromise().then(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  //JCMV metodo en el provider para hacer la peticion de registro
  registrar(_nombres : string, _apellidos : string, _email : string, _password : string){
    
    var url = 'http://loop-studio.com.mx/api2/loginSigninService.php';
    let postData = new FormData();
    postData.append('nombres', _nombres);
    postData.append('apellidos', _apellidos);
    postData.append('email', _email);
    postData.append('password', Md5.init(_password));
    return this.data = this.http.post(url, postData, {responseType: 'text'});

  }
  
}