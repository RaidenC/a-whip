import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFire, AngularFireAuth, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-add-measurement',
  templateUrl: 'add-measurement.html'
})
export class AddMeasurementPage {

  measurementDate: string;
  measurementTypes: Array<string>;
  measurements: any;
  measurementData: FirebaseListObservable<any>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    private _auth: AngularFireAuth
  ) {
    this.measurementDate = new Date().toISOString();
    this.measurementTypes = ['Weight', 'Chest', 'Waist', 'Bicep', 'Forearm'];
    this.measurements = {};
    this.measurementTypes.forEach(type => {
      this.measurements[type] = null;
    });

    this.measurementData = af.database.list('/measurements/' + this._auth.getAuth().uid);

  }

  saveMeasurement(): void {
    let data = {};
    data['Date'] = this.measurementDate;
    this.measurementTypes.forEach(type => {
      data[type] = this.measurements[type]; 
    });
    this.measurementData.push(data);

    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMeasurementPage');
  }

}
