import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.meal = this.navParams.data;
    this.segment = 'recent';
    this.recentFood = ['egg','beef'];
    this.customFood = ['pork meat ball','ramen'];
    this.recipes = ['twice-cooked pork'];
    this.meals = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFoodPage');
  }

  scan(){
    BarcodeScanner.scan().then((barcodeData)=>{
      console.log(barcodeData);
    },(err)=> {
      console.log(err);
    })
  }

  onInput(ev:any){
    let val = ev.target.value;
    console.log(val);
  }
}
