import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MacrosPage, NutrientsPage, CaloriesPage } from '../pages';

@Component({
  selector: 'page-nutrition',
  templateUrl: 'nutrition.html'
})
export class NutritionPage {

  MacrosTab = MacrosPage;
  NutrientsTab = NutrientsPage;
  CaloriesTab = CaloriesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NutritionPage');
  }

}
