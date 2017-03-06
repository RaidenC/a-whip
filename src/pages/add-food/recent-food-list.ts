import { Component, Input } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NdbService } from '../../providers/providers';

@Component({
  selector: 'recent-food-list',
  templateUrl: 'recent-food-list.html',
})
export class RecentFoodList {
  @Input() recentFood: Array<any>
  @Input() currentFoodSummary: any;
  @Input() query: string;

  constructor(
    public ndbService: NdbService,
    private _toastCtrl: ToastController
  ) {}

  searchFood(q: string) {
    console.log(q);
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
            this.recentFood.push({ "title": title, "keywords": keywords, "ndbno": food.ndbno });
          });
        }else{
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

        let pToast = this._toastCtrl.create({
          message: `${protein}/100g --------- Protein`,
          position: 'top',
          cssClass: 'protein',
          duration: 3000
        });


        let lToast = this._toastCtrl.create({
          message: `${lipid}/100g ---------- Fat (lipid)`,
          position: 'top',
          cssClass: 'lipid',
          duration: 3000
        });


        let cToast = this._toastCtrl.create({
          message: `${carbohydrate}/100g ---------- Carbohydrate `,
          position: 'top',
          cssClass: 'carbohydrate',
          duration: 3000
        });
        pToast.present();
        lToast.present();
        cToast.present();
      }
    );
  }
}
