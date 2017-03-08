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

  constructor(
    public ndbService: NdbService,
    private _navCtrl: NavController,
    private _navParamas: NavParams,
    private _toastCtrl: ToastController
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
          });
        } else {
          let toast = this._toastCtrl.create({
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

  addFood(id: number){
    this._navCtrl.push(FoodDetailPage);
  }
}
