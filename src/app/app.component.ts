import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { SignInPage, HomePage, NutritionPage, DiaryPage } from '../pages/pages';
import { AuthService } from '../providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SignInPage;
  pages: Array<{title: string, icon: string, component: any}>;
  userProfile: any;

  constructor(
    public platform: Platform,
    public events: Events,
    private _auth: AuthService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Diary', icon: 'clipboard', component: DiaryPage},
      { title: 'Nutrition', icon: 'stats', component: NutritionPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut():void {
    this._auth.logOut();
    this.nav.setRoot(this.rootPage);
  }
}
