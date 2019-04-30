import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergenciasPage } from './emergencias';

@NgModule({
  declarations: [
    EmergenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergenciasPage),
  ],
})
export class EmergenciasPageModule {}
