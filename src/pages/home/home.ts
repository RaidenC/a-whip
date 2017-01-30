import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { DiaryPage, AddFoodPage, AddMeasurementPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToDiary(){
    this.navCtrl.setRoot(DiaryPage);
  }

  addMeasurement(){
    this.navCtrl.push(AddMeasurementPage);
  }

  addFood(){
    let mealSelectionSheet = this.actionSheetCtrl.create({
      title: 'Meals',
      buttons: [
        {
          text: 'Breakfast',
          handler: ()=>{
            this.navCtrl.push(AddFoodPage,'Breakfast');
          }
        },
        {
          text: 'Lunch',
          handler: ()=>{
            this.navCtrl.push(AddFoodPage,'Lunch');
          }
        },
        {
          text: 'Dinner',
          handler: ()=>{
            this.navCtrl.push(AddFoodPage,'Dinner');
          }
        },
        {
          text: 'Snacks',
          handler: ()=>{
            this.navCtrl.push(AddFoodPage,'Snacks');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    mealSelectionSheet.present();
  }

}
