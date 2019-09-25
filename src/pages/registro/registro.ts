import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Slides} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TermsPage } from '../terms/terms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  @ViewChild(Slides) slides: Slides;

  age: number = 0;
  birthday: any;
  register_data = new FormGroup({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,Validators.required),
    cpassword: new FormControl(null,Validators.required),
    sexo: new FormControl(null,Validators.required),
    birthday: new FormControl(null,Validators.required),
    nombre: new FormControl(null,Validators.required)
  });

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

  onChangeCheckbox(name,element:Element){
    /* if(element.getAttribute('type') === 'radio'){
      document.getElementsByName(name).forEach((el:Element) => {
        el.classList.remove('checked');
      });
    }
    element.classList.toggle('checked'); */
    //console.log(this.register_data.value);
  }

  calculateAge(){
    var birthday = new Date(this.register_data.value.birthday);
    var now = new Date();
    console.log("variable1 " + now.getTime());
    console.log("variable2 " + birthday.getTime());
    var diff = now.getTime() - birthday.getTime();
    this.age = parseInt((diff / (31556926 * 1000)).toString());
    console.log("EDAD " + this.age);
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

  goToStep2() {
    this.slides.slideTo(1, 500);
  }


}