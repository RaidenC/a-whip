import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/providers';
import { HomePage } from '../pages';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _auth: AuthService
  ) {}

  signInWithGoogle ():void{
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  signInWithFacebook ():void{
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess():void {
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

}
