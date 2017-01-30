import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html'
})
export class AddFoodPage {

  meal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.meal = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }

}
