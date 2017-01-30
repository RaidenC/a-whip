import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-add-measurement',
  templateUrl: 'add-measurement.html'
})
export class AddMeasurementPage {

  measurementDate: string;
  measurements: Array<{title:string, value:number, unit:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.measurementDate = new Date().toISOString();
    this.measurements = [
      {title: 'Weight', value: 0, unit: 'Lbs'},
      {title: 'Chest', value: 0, unit: 'Inches'},
      {title: 'Waist', value: 0, unit: 'Inches'},
      {title: 'Bicep', value: 0, unit: 'Inches'},
      {title: 'Forearm', value:0, unit: 'Inches'}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMeasurementPage');
  }

}
