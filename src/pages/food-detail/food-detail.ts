import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NdbService } from '../../providers/providers';

@Component({
  selector: 'page-food-detail',
  templateUrl: 'food-detail.html'
})
export class FoodDetailPage {
  title: string;
  meal: any;
  foodDetail: any;
  foodSummary: any;
  servings: number;
  servingSize: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ndbService: NdbService,
  ) {
    this.title = this.navParams.get("title");
    this.meal = this.navParams.get("meal");
    this.foodDetail = this.navParams.get("food");
    this.foodSummary = this.navParams.get("summary");
    this.servings = 1.0;
    this.servingSize = 100;
  }

  save() {
    
  }

}
