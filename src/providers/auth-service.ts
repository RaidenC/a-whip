import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {

  private authState: FirebaseAuthState;

  constructor(public http: Http, public auth$: AngularFireAuth) {
    this.authState = auth$.getAuth();
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get userProfile(): any {
    return {
      displayName: this.authState.facebook.displayName,
      avatar: this.authState.facebook.photoURL
    };
  }

  signInAnonymous(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Anonymous,
      method:AuthMethods.Anonymous
    });
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

  logOut(): void {
    this.auth$.logout();
  }

  displayName(): string {
    if (this.authState.google != null) {
      return this.authState.google.displayName;
    } else {
      return '';
    }
  }
}
