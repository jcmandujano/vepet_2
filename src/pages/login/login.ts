import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegistroPage } from '../registro/registro';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {  

  public users: Object;
  public emailInput : string;
  public passwordInput : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public userService: UserServiceProvider,
              private alertCtrl: AlertController,
              public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //funcion que valida el formato de la direccion email ingresada
  validar_email( email : string ) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  //Funcion que envia alerta con el texto deseado enviado por parametros
  ErrorAlert(titulo : string, subtitulo : string, buttonText : string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: [buttonText]
    });
    alert.present();
  }

  //metodo para login
  logIn(){
    
   /* if(typeof this.emailInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa tu email.','Ok');
      return;
    }

    if( this.validar_email( this.emailInput ) == false ){
      this.ErrorAlert('Error','Ingresa un email valido.','Ok');
      return;
    }

    if(typeof this.passwordInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa tu password.','Ok');
      return;
    }*/
    
    this.userService.doLogin()
    .then(data => {
      console.log("holi", data);
      this.storage.set('userdata', data);
      this.navCtrl.setRoot(TabsPage, {'userdata':data});
    },
    (error) => {
      this.ErrorAlert('Error','Usuario o Password Incorrecto.','Ok.');
    });
  }

  

  GoToSigninPage(){
    this.navCtrl.push(RegistroPage);
  }

}
