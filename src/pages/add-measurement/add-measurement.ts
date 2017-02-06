import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, AngularFireAuth, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'page-add-measurement',
  templateUrl: 'add-measurement.html'
})
export class AddMeasurementPage {

  measurementDate: string;
  measurements: Array<{title:string, value:number, unit:string}>;
  measurement: FirebaseObjectObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    private _auth: AngularFireAuth
  ) {
    this.measurement = af.database.object('/' + this._auth.getAuth().uid  + '/measurement');
    this.measurementDate = new Date().toISOString();
    this.measurements = [
      {title: 'Weight', value: 0, unit: 'Lbs'},
      {title: 'Chest', value: 0, unit: 'Inches'},
      {title: 'Waist', value: 0, unit: 'Inches'},
      {title: 'Bicep', value: 0, unit: 'Inches'},
      {title: 'Forearm', value:0, unit: 'Inches'}
    ];
  }

  saveMeasurement():void {
    this.measurement.set(this.measurements[0]);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMeasurementPage');
  }

}
