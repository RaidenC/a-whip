import { Component, Input } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NdbService } from '../../providers/providers';

import { FoodDetailPage } from '../pages';

@Component({
  selector: 'search-food',
  templateUrl: 'search-food.html',
})
export class SearchFood {
  @Input() query: string;
  searchResult: Array<any>
  foodDetail: any;
  foodSummary: any;

  constructor(
    public ndbService: NdbService,
    public navCtrl: NavController,
    public navParamas: NavParams,
    public toastCtrl: ToastController
  ) {
    this.searchResult = [];
  }

  searchFood(q: string) {
    this.ndbService.searchFood(q)
      .subscribe(
      value => {
        if (!!value.list) {
          value.list.item.forEach(food => {
            let title: string = "";
            let keywords: Array<string> = [];
            keywords = food.name.split(",");
            keywords.pop();
            title = keywords.find(word => { return word.toUpperCase().includes(q.toUpperCase()) });
            keywords.splice(keywords.indexOf(title), 1);
            this.searchResult.push({ "title": title, "keywords": keywords, "ndbno": food.ndbno });
            // this.searchResult.sort((a,b)=>{
            //   return parseFloat(a.ndbno) - parseFloat(b.ndbno);
            // });
          });
        } else {
          let toast = this.toastCtrl.create({
            message: 'No record found',
            position: 'bottom',
            duration: 1000
          });
          toast.present();
        }
      },
      e => console.log(e),
      () => console.log("complete")
      );
  }

  addFood(title: string, ndbno: number) {
    this.ndbService.getFoodReport(ndbno)
      .subscribe(
      value => {
        this.foodDetail = value.report.food;
      },
      e => console.log(e),
      () => {
        this.getFoodSummary(title, ndbno);
      }
      );


  }

  getFoodSummary(title: string, ndbno: number) {
    this.ndbService.getNutrientSummary(ndbno)
      .subscribe(
      value => {
        this.foodSummary = value.report.foods[0];
      },
      e => console.log(e),
      () => {
        this.navCtrl.push(FoodDetailPage, { "title": title, "food": this.foodDetail, "summary": this.foodSummary });
      }
      );
  }
}
