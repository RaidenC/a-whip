import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddFoodPage } from '../pages';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {

  meals: Array<string> = ['Breakfast','Lunch', 'Dinner', 'Snacks'];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiaryPage');
  }

  addFood($event, m){
    this.navCtrl.push(AddFoodPage, m);
  }

}
