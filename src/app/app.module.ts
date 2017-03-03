import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';


import { MyApp } from './app.component';

import {
  SignInPage,
  HomePage,
  DiaryPage, AddFoodPage,
  AddMeasurementPage,
  NutritionPage, MacrosPage, NutrientsPage, CaloriesPage
} from '../pages/pages';

import { AuthService, NdbService } from '../providers/providers';

export const firebaseConfig = {
  apiKey: 'AIzaSyAKhMFfdFytQH-uOJc9cbGKKEAkvC6UFcc',
  authDomain: 'a-whip.firebaseapp.com',
  databaseURL: 'https://a-whip.firebaseio.com',
  storageBucket: 'a-whip.appspot.com',
  messagingSenderId: '776964278644'
};

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    HomePage,
    DiaryPage,
    AddFoodPage,
    AddMeasurementPage,
    NutritionPage,
    MacrosPage,
    NutrientsPage,
    CaloriesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    HomePage,
    DiaryPage,
    AddFoodPage,
    AddMeasurementPage,
    NutritionPage,
    MacrosPage,
    NutrientsPage,
    CaloriesPage
  ],
  providers: [
    AuthService,
    NdbService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
