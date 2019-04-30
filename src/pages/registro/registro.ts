import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController  } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TermsPage } from '../terms/terms';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public nombresInput : string;
  public apellidosInput : string;
  public emailInput : string;
  public passwordInput : string;
  public username : string;
  datosUsuario : any;
  output: JSON;
  loading: any;
  terminos : boolean = false;
  sinErrores :boolean = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userService: UserServiceProvider,
              private alertCtrl: AlertController,
              private loader : LoadingController,
              private modalCtrl : ModalController) {
  }

  registraUsuario(){
    this.loading = this.loader.create({ content: "registrando, espere por favor..." });
    
    this.sinErrores = this.validaCampos();
    if(this.sinErrores){
      this.loading.present();
      this.userService.registrar(this.nombresInput, this.apellidosInput, this.emailInput, this.passwordInput )
      .subscribe(
      (data) => {//Succes
        console.log(JSON.stringify(data));
        this.loading.dismissAll();
      },
      (error) => {
        this.loading.dismissAll();
        this.ErrorAlert('Error','Ocurrio un error al registrar.','Ok.');
      }
    ) 
    }
    

  }

  validaCampos(){
    if(typeof this.nombresInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa tu nombre.','Ok');
      return false;
    }

    if(typeof this.apellidosInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa tus apellidos.','Ok');
      return false;
    }

    if(typeof this.emailInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa tu email.','Ok');
      return false;
    }

    if( this.validar_email( this.emailInput ) == false ){
      this.ErrorAlert('Error','Ingresa un email valido.','Ok');
      return false;
    }

    if(typeof this.passwordInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa tu password.','Ok');
      return false;
    }
    if(this.terminos ==  false){
      this.ErrorAlert('Error','Debes aceptar los terminos y condiciones','Ok');
      return false;
    }
  }

  abrirTerminos(){
    let termsModal = this.modalCtrl.create(TermsPage);
    termsModal.present();
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

  //funcion que valida el formato de la direccion email ingresada
  validar_email( email : string ) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
  }

  cancelar(){
    this.navCtrl.pop();
  }


}
