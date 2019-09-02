import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {TabsPage, 
        LoginPage, 
        MascotasPage, 
        ConsultasPage, 
        MedicosPage, 
        EmergenciasPage, 
        RegistroPage,
        TermsPage, 
        VerMascotaPage,
        CreaMascotaPage,
        HomePage} from '../pages/index.paginas';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { HttpClientModule  } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { MascotasProvider } from '../providers/mascotas/mascotas';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
    MascotasPage, 
    ConsultasPage, 
    MedicosPage, 
    EmergenciasPage,
    TabsPage,
    RegistroPage,
    TermsPage,
    CreaMascotaPage,
    HomePage,
    VerMascotaPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atras'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MascotasPage, 
    ConsultasPage, 
    MedicosPage, 
    EmergenciasPage,
    TabsPage,
    RegistroPage,
    TermsPage,
    CreaMascotaPage,
    HomePage,
    VerMascotaPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    MascotasProvider,
    StorageProvider
  ]
})
export class AppModule {}
