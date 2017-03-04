import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
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
  customFood: Array<any>;
  recipes: Array<any>;
  meals: Array<any>;
  query: string;
  currentFoodSummary: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _toastCtrl: ToastController,
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

  getSummary(ndbno: any) {
      console.log(this.currentFoodSummary.ndbno);
      if(ndbno!==this.currentFoodSummary.ndbno){
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

  searchFood(q: string, segment: string) {
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
            switch (segment) {
              case 'recent':
                this.recentFood.push({"title":title, "keywords":keywords, "ndbno":food.ndbno});
                break;
              case 'custom':
                this.customFood.push({"title":title, "keywords":keywords, "ndbno":food.ndbno});
                break;
              case 'recipes':
                this.recipes.push({"title":title, "keywords":keywords, "ndbno":food.ndbno});
                break;
              case 'meals':
                this.meals.push({"title":title, "keywords":keywords, "ndbno":food.ndbno});
                break;
            }
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
        this.currentFoodSummary = value.report.foods[0];
      },
      e => console.log(e),
      () => {
        let protein = this.currentFoodSummary.nutrients[1].gm;
        let lipid = this.currentFoodSummary.nutrients[2].gm;
        let carbohydrate = this.currentFoodSummary.nutrients[3].gm;

        let toast = this._toastCtrl.create({
          message:`
            Protein: ${protein}
            Fat: ${lipid}
            Carbs: ${carbohydrate}
            `,
          duration: 3000,
          position: 'top'
        });

        toast.present();
      }
    );
  }
}
