import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NdbService } from '../../providers/providers';

@Component({
  selector: 'page-food-detail',
  templateUrl: 'food-detail.html'
})
export class FoodDetailPage {
  title: string
  foodDetail: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ndbService: NdbService,
  ) {
    this.title = this.navParams.get("title");
    this.foodDetail = this.navParams.get("food");
  }

}
