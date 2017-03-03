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
  segment: any;
  recentFood: Array<string>;
  customFood: Array<string>;
  recipes: Array<string>;
  meals: Array<string>;
  query: string;
  currentFoodSummary: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ndbService: NdbService
  ) {
    this.meal = this.navParams.data;
    this.segment = 'recent';
    this.recentFood = [];
    this.customFood = [];
    this.recipes = [];
    this.meals = [];
    this.currentFoodSummary = this.ndbService.emptyFoodSummary();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }

  ondrag(e: any, ndbno: any) {
    let percent = e.getSlidingPercent();
    if (this.currentFoodSummary.ndbno !== ndbno && percent < 0) {
      this.getNutrientSummary(ndbno);
    }
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

  searchFood(q: any) {
    this.ndbService.searchFood(q)
      .subscribe(
      value => {
        if (value.list.item) {
          this.recentFood = value.list.item
        }
      },
      e => console.log(e),
      () => console.log("complete")
      );
  }

  getNutrientSummary(q: any) {
    this.ndbService.getNutrientSummary(q).subscribe(
      value => {
        this.currentFoodSummary = value.report.foods[0];
      },
      e => console.log(e),
      () => console.log("complete")
    );
  }
}
