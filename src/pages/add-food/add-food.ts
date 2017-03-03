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
  recentFood: Array<any>;
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

  addFood(id:any){

  }

  searchFood(q: string) {
    this.ndbService.searchFood(q)
      .subscribe(
      value => {
        if (value.list.item) {
          // this.recentFood = value.list.item
          value.list.item.forEach(food => {
            let title:string = "";
            let keywords:Array<string> = [];
            keywords = food.name.split(",");
            keywords.pop();
            title = keywords.find(word => {return word.toUpperCase().includes(q.toUpperCase())});
            keywords.splice(keywords.indexOf(title),1);
            this.recentFood.push({"title":title, "keywords":keywords, "ndbno":food.ndbno});
          });
        }
      },
      e => console.log(e),
      () => console.log("complete")
      );
  }

  getNutrientSummary(q: any) {
    this.ndbService.getNutrientSummary(q).subscribe(
      value => {
        // this.currentFoodSummary = value.report.foods[0];
        this.currentFoodSummary.nutrients = [];
        value.report.foods[0].nutrients.forEach(nutrient => {
          if(nutrient.gm === "--"){
            nutrient.gm = 0;
          }
          this.currentFoodSummary.nutrients.push(nutrient);
        });
      },
      e => console.log(e),
      () => console.log("complete")
    );
  }
}
