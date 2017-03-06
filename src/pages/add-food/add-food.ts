import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

import { NdbService } from '../../providers/providers';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-add-food',
  templateUrl: 'add-food.html'
})
export class AddFoodPage {

  meal: any;
  segment: string;
  query: string;
  customFood: Array<any>;
  recipes: Array<any>;
  meals: Array<any>;
  recentFood: Array<any>
  currentFoodSummary: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ndbService: NdbService
  ) {
    this.meal = this.navParams.data;
    this.segment = 'recent';
    this.recentFood = []
    this.customFood = [];
    this.recipes = [];
    this.meals = [];
    this.currentFoodSummary = this.ndbService.emptyFoodSummary();
  }

  scan() {
    BarcodeScanner.scan().then((barcodeData) => {
      console.log(barcodeData);
    }, (err) => {
      console.log(err);
    })
  }

  onInput(ev: any) {
    this.query = ev.target.value;
    this.recentFood = [];
    this.currentFoodSummary = this.ndbService.emptyFoodSummary();
  }

  addFood(id: any) {
  }
}
