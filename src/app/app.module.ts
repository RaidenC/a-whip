import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {
  HomePage,
  DiaryPage, AddFoodPage,
  AddMeasurementPage,
  NutritionPage, MacrosPage, NutrientsPage, CaloriesPage
} from '../pages/pages';

@NgModule({
  declarations: [
    MyApp,
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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiaryPage,
    AddFoodPage,
    AddMeasurementPage,
    NutritionPage,
    MacrosPage,
    NutrientsPage,
    CaloriesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
