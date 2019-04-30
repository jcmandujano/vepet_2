import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerMascotaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-mascota',
  templateUrl: 'ver-mascota.html',
})
export class VerMascotaPage {

  public mascotaData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mascotaData = this.navParams.get("mascotaInfo");
    console.log("Data En Ver Mascota " + JSON.stringify(this.mascotaData));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerMascotaPage');
  }

}
