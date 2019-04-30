import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreaMascotaPage } from './crea-mascota';

@NgModule({
  declarations: [
    CreaMascotaPage,
  ],
  imports: [
    IonicPageModule.forChild(CreaMascotaPage),
  ],
})
export class CreaMascotaPageModule {}
