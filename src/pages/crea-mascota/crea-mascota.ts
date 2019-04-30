import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Slides  } from 'ionic-angular';
import { MascotasProvider } from '../../providers/mascotas/mascotas';
import { Storage } from '@ionic/storage';
import { MASCOTAS } from '../../data/data.mascotas';
import { Mascotas } from '../../interfaces/interface.mascotas';

@IonicPage()
@Component({
  selector: 'page-crea-mascota',
  templateUrl: 'crea-mascota.html',
})
export class CreaMascotaPage {

  @ViewChild(Slides) slides: Slides;

  mascotas : Mascotas[] = [];
  public nombreInput : string;
  public tipoInput : string;
  public razaInput : string;
  public generoInput : string;
  public edadInput : string;
  public tallaInput : string;

  public iduser:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage : Storage,
              private alertCtrl: AlertController,
              public mascotaProvider : MascotasProvider,
              public viewCtrl: ViewController) {
                this.mascotas = MASCOTAS.slice(0);
                storage.get('userdata').then((val) => {
                  this.iduser = val.id_usuario;
                });
  }

  muestra_mensaje_confirm(titulo : string, subtitulo : string, buttonText : string){
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: subtitulo,
      buttons: [{
        text: buttonText,
        handler: () => {
            this.returnHome();
            alert.dismiss(true);
            return false;
        }
    }]
    });
    alert.present();
  }

  insertaMascota(){
    let validados: boolean = true;
    //console.log('Your real info is',  this.iduser);
    validados = this.validaCampos();
    if(validados){
      this.mascotaProvider.postMascota(this.iduser ,this.nombreInput, this.tipoInput, this.razaInput, this.generoInput, this.edadInput, this.tallaInput ,"1")
      .subscribe(
        (data) => {//Succes
          this.muestra_mensaje_confirm('Mascota Creada','Se creo tu mascota correctamente.','Ok');
          console.log(JSON.stringify(data));
        },
        (error) => {
          //console.log('Error-'+JSON.stringify(error));
          this.ErrorAlert('Error',error,'Ok');
        }
      ) 
    }
    
  }

  validaCampos(){
    
    if(typeof this.nombreInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa el nombre de tu mascota.','Ok');
      return false;
    }else if(typeof this.tipoInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa ek tipo de mascota.','Ok');
      return false;
    }else if(typeof this.razaInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa la raza de tu mascota.','Ok');
      return false;
    }else if(typeof this.generoInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa el genero de tu mascota.','Ok');
      return false;
    }else if(typeof this.edadInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa la edad de tu mascota.','Ok');
      return false;
    }else if(typeof this.tallaInput == 'undefined'){
      this.ErrorAlert('Error','Ingresa el tamaño de tu mascota.','Ok');
      return false;
    }else {
      return true;
    }
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

  returnHome() {
    this.viewCtrl.dismiss();
  }

  goToStep2() {
    this.slides.slideTo(1, 500);
  }

  onChangeTipoMascota(value: any){
    console.log("seleccionaste " + value);
  }

}
