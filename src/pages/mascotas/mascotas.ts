import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Loading, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { CreaMascotaPage , VerMascotaPage} from '../../pages/index.paginas';
import { MascotasProvider } from '../../providers/mascotas/mascotas';

@IonicPage()
@Component({
  selector: 'page-mascotas',
  templateUrl: 'mascotas.html',
})
export class MascotasPage {

  public iduser: any;
  public mascotas: any;
  public loading : Loading;
  constructor(public navCtrl: NavController, 
              public storage : Storage,
              private alertCtrl: AlertController,
              private mascotasProv : MascotasProvider,
              private modalCtrl : ModalController,
              public loadingCtrl: LoadingController) {
    this.GetUserInfo();
  }

  GetUserInfo(){
     this.loading = this.loadingCtrl.create({
      content: 'Obteniendo información...'
    });
  
    this.loading.present();
    if(typeof this.iduser == 'undefined'){
      this.storage.get('userdata').then((val) => {
       // console.log("valor " + JSON.stringify(val));
        this.iduser = val.id_usuario;
        this.loading.dismiss();
      this.get_mascotas(this.iduser);
      });
    }else {
      this.get_mascotas(this.iduser);
      this.loading.dismiss();
    }
  }

  public creaMascota(){
    let termsModal = this.modalCtrl.create(CreaMascotaPage);
    termsModal.onDidDismiss(() => {
      // This will be executed after the modal is dismissed...
      this.GetUserInfo();
    });
    termsModal.present();
  }
  
  public get_mascotas(user:string){
    this.mascotasProv.getMascotas(this.iduser, "0").then(data=>{
      this.mascotas = data;
    },(error) => {
      console.log("error al obtener mascotas " + error); 
    });
  }

  public borrarMascota(idmascota:string){
    console.log("borrando mascota id " + idmascota);
  }

  public consultaMascota(mascotaInfo : any){
    console.log("consultando mascota id " + mascotaInfo);
    this.navCtrl.push(VerMascotaPage, {"mascotaInfo":mascotaInfo});
  }

  public recargarMascotas(refresher:any){
    this.GetUserInfo();
  	refresher.complete();
  }

}