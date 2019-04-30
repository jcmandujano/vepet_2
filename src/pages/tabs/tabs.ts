import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MascotasPage, ConsultasPage, MedicosPage, EmergenciasPage } from '../index.paginas';
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1:any;
  tab2:any;
  tab3:any;
  tab4:any;
  mensaje:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage : Storage) {
    this.tab1 = MascotasPage;
    this.tab2 = ConsultasPage;
    this.tab3 = MedicosPage;
    this.tab4 = EmergenciasPage;
  }

  
 
}
